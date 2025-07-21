import OpenAI from 'openai';

export default async function rateTranslation(source, candidate, language) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required');
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Evaluate the quality of this ${language} translation. Rate on a scale of 1-5 and briefly justify.`;
  const messages = [
    { role: 'system', content: prompt },
    { role: 'user', content: `English: ${source}\nTranslation: ${candidate}` }
  ];
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 10
  });
  return res.choices[0].message.content.trim();
}
