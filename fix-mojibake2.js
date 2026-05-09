const fs = require('fs');
const path = require('path');

const replacements = {
  'Â·': '·',
  'Â©': '©',
  'â€': '”', // fallback for any missed quotes
  'â€™': '’',
  'â€œ': '“',
  'â€”': '—',
  'â€“': '–',
  'â€˜': '‘'
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [bad, good] of Object.entries(replacements)) {
        content = content.split(bad).join(good);
      }
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed ${fullPath}`);
      }
    }
  }
}

['app', 'components', 'lib'].forEach(walk);
console.log('Done.');
