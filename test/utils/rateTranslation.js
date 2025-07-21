import { OpenAI } from 'openai';

let openai;
function getClient() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}
const MAX_CONCURRENT = 5;
let active = 0;
const queue = [];

async function callOpenAI(source, target) {
  const systemPrompt = `You are a bilingual quality checker.\nGiven {source} and {target}, return a single number between 0 and 1 indicating how faithful and natural the translation is.\nOutput only the number.`;
  const client = getClient();
  const completion = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify({ source, target }) }
    ],
    temperature: 0,
    max_tokens: 3
  });
  const text = completion.choices[0].message.content.trim();
  const num = parseFloat(text);
  return Number.isFinite(num) ? num : 0;
}

export default function rateTranslation(source, target) {
  return new Promise((resolve, reject) => {
    const run = async () => {
      try {
        const score = await callOpenAI(source, target);
        resolve(score);
      } catch (err) {
        reject(err);
      } finally {
        active--;
        if (queue.length) {
          const next = queue.shift();
          next();
        }
      }
    };

    if (active < MAX_CONCURRENT) {
      active++;
      run();
    } else {
      queue.push(() => {
        active++;
        run();
      });
    }
  });
}
