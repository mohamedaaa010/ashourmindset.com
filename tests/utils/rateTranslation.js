import OpenAI from 'openai';
import pLimit from 'p-limit';

const openai = new OpenAI();
const limiter = pLimit(1); // serialise inside helper to respect rate limits

export async function rateTranslation(source, target) {
  if (!process.env.OPENAI_API_KEY) return 1; // skip quality if no key
  return limiter(async () => {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a bilingual quality checker. ' +
            'Given {source} and {target}, output one number 0-1 for quality.'
        },
        { role: 'user', content: `source: "${source}"\ntarget: "${target}"` }
      ],
      temperature: 0
    });
    const num = parseFloat(res.choices[0].message.content);
    return isFinite(num) ? num : 0;
  });
}
