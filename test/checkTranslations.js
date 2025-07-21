import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateTranslation from './utils/rateTranslation.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, '..', 'i18n');

function loadLocales() {
  const locales = {};
  for (const file of fs.readdirSync(i18nDir)) {
    if (file.endsWith('.json')) {
      const locale = path.basename(file, '.json');
      const content = JSON.parse(fs.readFileSync(path.join(i18nDir, file), 'utf8'));
      locales[locale] = content;
    }
  }
  return locales;
}

function collectKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') {
      keys = keys.concat(collectKeys(v, full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

function collectPairs(targetObj, sourceObj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(sourceObj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const targetVal = targetObj[k];
    if (v && typeof v === 'object') {
      collectPairs(targetObj[k] || {}, v, key, out);
    } else {
      out.push({ key, source: v, target: targetVal });
    }
  }
  return out;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fail(msg) {
  console.error(`\u274c ${msg}`);
  process.exit(1);
}

async function main() {
  const locales = loadLocales();
  const english = locales.en;
  if (!english) fail('Missing en.json locale');

  // Phase 1: Key parity
  const englishKeys = collectKeys(english).sort();
  for (const [locale, data] of Object.entries(locales)) {
    const keys = collectKeys(data).sort();
    if (!arraysEqual(englishKeys, keys)) {
      fail(`Key mismatch in ${locale}`);
    }
  }

  // Phase 2: Translation presence
  const placeholders = ['TODO', 'TBD', '...', '\u2014'];
  for (const [locale, data] of Object.entries(locales)) {
    if (locale === 'en') continue;
    const pairs = collectPairs(data, english);
    const bad = pairs.filter(p =>
      p.target === '' ||
      p.target === p.source ||
      placeholders.includes(p.target)
    );
    if (bad.length) {
      console.error(`\u274c Missing or placeholder translations in ${locale}:`);
      bad.forEach(p => console.error(`  ${p.key}: "${p.target}"`));
      process.exit(1);
    }
  }

  // Phase 3: Quality check with OpenAI
  if (!process.env.OPENAI_API_KEY) {
    console.warn('Skipping quality check: OPENAI_API_KEY not set');
  } else {
    for (const [locale, data] of Object.entries(locales)) {
      if (locale === 'en') continue;
      const pairs = collectPairs(data, english);
      shuffle(pairs);
      const sample = pairs.slice(0, 40);
      const results = [];
      for (const { key, source, target } of sample) {
        const score = await rateTranslation(source, target);
        results.push({ key, score, source, target });
      }
      const bad = results.filter(r => r.score < 0.7);
      if (bad.length / results.length > 0.2) {
        console.error(`\u274c Quality check failed for ${locale}`);
        console.table(bad.sort((a, b) => a.score - b.score).map(r => ({
          key: r.key,
          score: r.score.toFixed(2),
          source: r.source,
          target: r.target
        })));
        process.exit(1);
      }
    }
  }

  console.log('\u2705 Translations passed all checks.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
