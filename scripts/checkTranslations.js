import fs from 'fs';
import path from 'path';
import process from 'process';

const i18nDir = path.resolve('i18n');
const files = ['en.json', 'de.json', 'ar.json'];

function loadJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(i18nDir, file), 'utf8'));
}

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null) {
      keys = keys.concat(getKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function compareKeys(baseKeys, otherKeys, lang) {
  const missing = baseKeys.filter(k => !otherKeys.includes(k));
  const extra = otherKeys.filter(k => !baseKeys.includes(k));
  if (missing.length || extra.length) {
    console.log(`\nIssues found in ${lang}:`);
    if (missing.length) console.log('  Missing keys:', missing.join(', '));
    if (extra.length) console.log('  Extra keys:', extra.join(', '));
    return true;
  }
  return false;
}

function main() {
  const data = files.map(f => loadJSON(f));
  const baseKeys = getKeys(data[0]);
  let hasIssues = false;
  for (let i = 1; i < data.length; i++) {
    const keys = getKeys(data[i]);
    if (compareKeys(baseKeys, keys, files[i])) {
      hasIssues = true;
    }
  }
  if (hasIssues) {
    console.error('\nTranslation files are inconsistent.');
    process.exitCode = 1;
  } else {
    console.log('All translation files have consistent keys.');
  }
}

main();
