let fetchFn = global.fetch;
if (!fetchFn) {
  try {
    fetchFn = require('node-fetch');
  } catch (err) {
    throw new Error('Fetch API not available and node-fetch not installed');
  }
}
const fetch = fetchFn;
require('dotenv').config();

// Simple concurrency limiter
const concurrency = 5;
const queue = [];
let active = 0;

function run(fn) {
  return new Promise((resolve, reject) => {
    queue.push({fn, resolve, reject});
    next();
  });
}

function next() {
  if (active >= concurrency || queue.length === 0) return;
  const {fn, resolve, reject} = queue.shift();
  active++;
  fn().then(resolve, reject).finally(() => {
    active--;
    next();
  });
}

async function callOpenAI(source, target) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {role: 'system', content: 'You evaluate translation quality.'},
        {role: 'user', content: `Rate from 0 to 1 how well the following target text translates the source text. Respond only with the number.\nSource: "${source}"\nTarget: "${target}"`}
      ],
      temperature: 0
    })
  });

  const data = await response.json();
  const text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
  const match = text && text.match(/\d*\.?\d+/);
  const score = match ? parseFloat(match[0]) : NaN;
  if (isNaN(score)) throw new Error('Invalid score from OpenAI');
  return Math.max(0, Math.min(1, score));
}

function rateTranslation(source, target) {
  return run(() => callOpenAI(source, target));
}

module.exports = { rateTranslation };
