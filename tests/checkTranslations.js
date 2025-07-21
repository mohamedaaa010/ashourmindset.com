{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /* eslint-disable no-console */\
import fs from 'fs';\
import path from 'path';\
import pLimit from 'p-limit';\
import \{ rateTranslation \} from './utils/rateTranslation.js';\
import 'dotenv/config';\
\
const i18nDir = path.join(process.cwd(), 'i18n');\
const PLACEHOLDERS = new Set(['', 'TODO', 'TBD', '...', '\'97']);\
const SAMPLE_SIZE  = 40;\
const CONCURRENCY  = 5;\
const QUALITY_THRESHOLD = 0.7;\
const FAIL_RATE = 0.2; // 20 %\
\
/* ---------- helpers ---------- */\
const readJSON = fp => JSON.parse(fs.readFileSync(fp, 'utf8'));\
const flatten  = (obj, prefix = '') =>\
  Object.entries(obj).flatMap(([k, v]) => \{\
    const key = prefix ? `$\{prefix\}.$\{k\}` : k;\
    return v && typeof v === 'object'\
      ? flatten(v, key)\
      : [[key, String(v).trim()]];\
  \});\
\
/* ---------- Phase 0: load files ---------- */\
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json'));\
if (!files.includes('en.json'))\
  throw new Error('en.json (reference) not found in i18n directory');\
\
const en    = readJSON(path.join(i18nDir, 'en.json'));\
const ref   = Object.fromEntries(flatten(en));\
\
/* ---------- Phase 1: key parity ---------- */\
let hasError = false;\
for (const file of files) \{\
  const data = readJSON(path.join(i18nDir, file));\
  const flat = Object.fromEntries(flatten(data));\
  const missing = Object.keys(ref).filter(k => !(k in flat));\
  const extra   = Object.keys(flat).filter(k => !(k in ref));\
  if (missing.length || extra.length) \{\
    console.error(`\uc0\u10060  Key mismatch in $\{file\}`);\
    if (missing.length) console.error('   Missing:', missing.join(', '));\
    if (extra.length)   console.error('   Extra:',   extra.join(', '));\
    hasError = true;\
  \}\
\}\
\
/* ---------- Phase 2: placeholder / identical ---------- */\
for (const file of files.filter(f => f !== 'en.json')) \{\
  const data = readJSON(path.join(i18nDir, file));\
  const flat = Object.fromEntries(flatten(data));\
  const bad  = [];\
  for (const k of Object.keys(ref)) \{\
    const t = flat[k];\
    if (t === undefined || t === ref[k] || PLACEHOLDERS.has(t)) bad.push(k);\
  \}\
  if (bad.length) \{\
    console.error(`\uc0\u10060  Untranslated strings in $\{file\}: $\{bad.join(', ')\}`);\
    hasError = true;\
  \}\
\}\
\
/* ---------- Phase 3: quality sampling ---------- */\
if (process.env.OPENAI_API_KEY) \{\
  const limit = pLimit(CONCURRENCY);\
  for (const file of files.filter(f => f !== 'en.json')) \{\
    const data = readJSON(path.join(i18nDir, file));\
    const flat = Object.fromEntries(flatten(data));\
    const keys = Object.keys(ref);\
    const sampleKeys = keys.sort(() => 0.5 - Math.random()).slice(0, SAMPLE_SIZE);\
    const ratings = await Promise.all(sampleKeys.map(k =>\
      limit(() => rateTranslation(ref[k], flat[k] || ''))\
        .catch(err => \{\
          console.error('OpenAI error:', err.message);\
          return 0;\
        \})\
    ));\
    const failures = ratings.filter(r => r < QUALITY_THRESHOLD);\
    if (failures.length / sampleKeys.length > FAIL_RATE) \{\
      console.error(`\uc0\u10060  $\{file\}: $\{(failures.length / sampleKeys.length * 100).toFixed(1)\}% of sampled strings scored < $\{QUALITY_THRESHOLD\}`);\
      sampleKeys.forEach((k, i) => \{\
        if (ratings[i] < QUALITY_THRESHOLD)\
          console.error(`   \'95 $\{k\}  score=$\{ratings[i].toFixed(2)\}  "$\{flat[k]\}"`);\
      \});\
      hasError = true;\
    \}\
  \}\
\} else \{\
  console.log('\uc0\u8505 \u65039   OPENAI_API_KEY not set \'96 skipping Phase 3 quality checks.');\
\}\
\
if (hasError) \{\
  console.error('\\nTranslation check failed.');\
  process.exit(1);\
\}\
console.log('\uc0\u9989  Translations passed all checks.');\
}