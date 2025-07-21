// This script checks that all translation files are complete and reasonably
// accurate. It is intentionally straightforward so non-developers can run it
// with `node test/checkTranslations.js` once Node.js and the dependencies are
// installed (run `npm install`).

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { rateTranslation } = require('./utils/rateTranslation');

const OPENAI_KEY = process.env.OPENAI_API_KEY;

// Folder containing translation JSON files
const LOCALES_DIR = path.join(__dirname, '..', 'i18n');
// Values that indicate an unfinished translation
const PLACEHOLDERS = new Set(['TODO', 'TBD', '...', '—']);

function readJson(file) {
  // Read a JSON file from disk
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Recursively collect dot-separated keys from nested objects
function collectKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') {
      keys = keys.concat(collectKeys(v, key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}

function getValue(obj, key) {
  // Retrieve a nested value like "nav.home" from an object
  return key.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

(async function main() {
  if (!fs.existsSync(LOCALES_DIR)) {
    console.error(`Translation folder not found: ${LOCALES_DIR}`);
    process.exit(1);
  }
  const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json'));
  const locales = files.map(f => path.basename(f, '.json'));
  const data = {};
  for (const f of files) {
    data[path.basename(f, '.json')] = readJson(path.join(LOCALES_DIR, f));
  }

  const en = data.en;
  if (!en) {
    console.error('Missing en.json');
    process.exit(1);
  }

  // -------- Phase 1: key parity --------
  const enKeys = collectKeys(en);
  let parityFailed = false;
  for (const locale of locales) {
    const keys = collectKeys(data[locale]);
    const missing = enKeys.filter(k => !keys.includes(k));
    const extra = keys.filter(k => !enKeys.includes(k));
    if (missing.length || extra.length) {
      parityFailed = true;
      console.error(`Key mismatch for ${locale}: missing ${missing.length}, extra ${extra.length}`);
    }
  }

  // -------- Phase 2: placeholder/empty/identical checks --------
  let placeholderFailed = false;
  for (const locale of locales) {
    if (locale === 'en') continue;
    for (const key of enKeys) {
      const source = getValue(en, key);
      const target = getValue(data[locale], key);
      if (target === undefined) continue; // handled in parity
      if (!target || target.trim() === '' || PLACEHOLDERS.has(target.trim()) || target.trim() === source.trim()) {
        placeholderFailed = true;
        console.error(`Bad translation for ${locale}.${key}: "${target}"`);
      }
    }
  }

  // -------- Phase 3: quality sampling using OpenAI --------
  let qualityFailed = false;
  const worst = [];
  if (OPENAI_KEY) {
    for (const locale of locales) {
      if (locale === 'en') continue;
      const pairs = enKeys.map(key => ({ key, source: getValue(en, key), target: getValue(data[locale], key) }));
      const sample = pairs.sort(() => Math.random() - 0.5).slice(0, 40);
      let results;
      try {
        results = await Promise.all(
          sample.map(p =>
            rateTranslation(p.source, p.target).then(score => ({ ...p, score }))
          )
        );
      } catch (err) {
        console.error(`OpenAI API error: ${err.message}`);
        process.exit(1);
      }
      results.sort((a, b) => a.score - b.score);
      worst.push(
        ...results.slice(0, 5).map(r => ({
          locale,
          key: r.key,
          score: r.score.toFixed(2),
          source: r.source,
          target: r.target,
        }))
      );
      const bad = results.filter(r => r.score < 0.7).length;
      if (bad > results.length * 0.2) {
        qualityFailed = true;
        console.error(`Poor translation quality detected for ${locale}: ${bad}/${results.length} below 0.70`);
      }
    }
  } else {
    console.log('Skipping OpenAI quality checks (set OPENAI_API_KEY to enable).');
  }

  if (worst.length) {
    console.table(worst.sort((a,b)=>a.score-b.score));
  }

  if (parityFailed || placeholderFailed || qualityFailed) {
    console.error('Translation check failed.');
    process.exit(1);
  }
  console.log('All translations look good!');
})();
