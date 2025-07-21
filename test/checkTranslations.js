const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '..', 'i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.error('No translation files found in i18n directory');
  process.exit(1);
}

function collectKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') {
      return [fullKey, ...collectKeys(value, fullKey)];
    }
    return [fullKey];
  }).sort();
}

let referenceKeys;
for (const file of files) {
  const filePath = path.join(i18nDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const keys = collectKeys(data);
  if (!referenceKeys) {
    referenceKeys = keys;
  } else {
    const diffA = referenceKeys.filter(k => !keys.includes(k));
    const diffB = keys.filter(k => !referenceKeys.includes(k));
    if (diffA.length || diffB.length) {
      console.error(`Key mismatch in ${file}`);
      console.error('Missing in current file:', diffA);
      console.error('Extra in current file:', diffB);
      process.exit(1);
    }
  }
}
console.log('All translation files have matching key structures.');

