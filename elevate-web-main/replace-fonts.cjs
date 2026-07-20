const fs = require('fs');
const path = require('path');
const dir = 'src/components/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { pattern: /text-4xl md:text-[56]xl lg:text-[67]xl/g, replacement: 'text-h1-bold' },
  { pattern: /text-[34]xl md:text-5xl/g, replacement: 'text-h2-bold' },
  { pattern: /text-xl md:text-3xl/g, replacement: 'text-h2' },
  { pattern: /text-xl md:text-2xl/g, replacement: 'text-h3' },
  { pattern: /text-2xl md:text-3xl/g, replacement: 'text-h3-bold' },
  { pattern: /text-lg md:text-xl/g, replacement: 'text-h3' },
  { pattern: /text-sm md:text-base/g, replacement: 'text-body' },
  { pattern: /text-xs md:text-sm/g, replacement: 'text-h5' },
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  
  replacements.forEach(({pattern, replacement}) => {
    content = content.replace(pattern, replacement);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
});
