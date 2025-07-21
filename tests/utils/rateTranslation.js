{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import OpenAI from 'openai';\
import pLimit from 'p-limit';\
\
const openai = new OpenAI();\
const limiter = pLimit(1); // serialise inside helper to respect rate limits\
\
export async function rateTranslation(source, target) \{\
  if (!process.env.OPENAI_API_KEY) return 1; // skip quality if no key\
  return limiter(async () => \{\
    const res = await openai.chat.completions.create(\{\
      model: 'gpt-3.5-turbo',\
      messages: [\
        \{ role: 'system', content:\
          'You are a bilingual quality checker. ' +\
          'Given \{source\} and \{target\}, output one number 0-1 for quality.' \},\
        \{ role: 'user', content: `source: "$\{source\}"\\ntarget: "$\{target\}"` \}\
      ],\
      temperature: 0\
    \});\
    const num = parseFloat(res.choices[0].message.content);\
    return isFinite(num) ? num : 0;\
  \});\
\}\
}