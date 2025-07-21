const fs = require('fs');
const path = require('path');

const regex = /New York(?:,\s*NY)?(?:,\s*USA)?(?:\s*\d{5})?/gi;
const replacement = 'Dubai, UAE';

const exts = new Set(['.html', '.md']);

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(regex, replacement);
  if (content !== updated) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Updated ${file}`);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (['.git', 'assets', 'node_modules'].includes(entry)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (stat.isFile() && exts.has(path.extname(full))) {
      processFile(full);
    }
  }
}

walk('.');
