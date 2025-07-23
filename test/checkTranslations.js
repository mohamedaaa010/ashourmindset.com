import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import rateTranslation from './rateTranslation.js';

// Load environment variables from .env if present
dotenv.config();

const LOCALES_DIR = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'i18n');
const baseLang = 'en';

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function diffKeys(base, compare) {
  const missing = [];
  for (const key of Object.keys(base)) {
    if (!(key in compare)) missing.push(key);
  }
  const extra = [];
  for (const key of Object.keys(compare)) {
    if (!(key in base)) extra.push(key);
  }
  return { missing, extra };
}

function phase1() {
  const basePath = path.join(LOCALES_DIR, `${baseLang}.json`);
  const baseData = readJson(basePath);

  const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json') && f !== `${baseLang}.json`);
  let ok = true;
  for (const file of files) {
    const data = readJson(path.join(LOCALES_DIR, file));
    const diff = diffKeys(baseData, data);
    if (diff.missing.length || diff.extra.length) {
      console.error(`\n[${file}] key mismatch:`);
      if (diff.missing.length) console.error('  missing:', diff.missing.join(', '));
      if (diff.extra.length) console.error('  extra:', diff.extra.join(', '));
      ok = false;
    }
  }
  return ok;
}

async function phase3() {
  const baseData = readJson(path.join(LOCALES_DIR, `${baseLang}.json`));
  const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json') && f !== `${baseLang}.json`);
  for (const file of files) {
    const lang = path.basename(file, '.json');
    const data = readJson(path.join(LOCALES_DIR, file));
    for (const key of Object.keys(baseData)) {
      if (typeof data[key] === 'string') {
        const rating = await rateTranslation(baseData[key], data[key], lang);
        console.log(`${lang}:${key}: ${rating}`);
      }
    }
  }
}

async function main() {
  const ok = phase1();
  if (!ok) {
    console.error('Translation consistency check failed.');
    process.exitCode = 1;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.log('Skipping Phase 3: no OPENAI_API_KEY provided');
    return;
  }

  try {
    await phase3();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

main();
