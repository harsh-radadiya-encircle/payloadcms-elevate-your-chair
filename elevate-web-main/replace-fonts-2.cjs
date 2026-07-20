const fs = require('fs');
const path = require('path');
const dir = 'src/components/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // ContactInformation
  { pattern: /text-4xl md:text-6xl/g, replacement: 'text-h1-bold' },
  // HeroSlider
  { pattern: /text-xl md:text-4xl/g, replacement: 'text-h2' },
  // ComparisonTable / ImageCardsSection
  { pattern: /text-3xl md:text-4xl/g, replacement: 'text-h2-bold' },
  { pattern: /text-2xl/g, replacement: 'text-h3-bold' },
  // General
  { pattern: /text-xs/g, replacement: 'text-h5' },
  { pattern: /text-sm/g, replacement: 'text-body' },
  { pattern: /text-lg/g, replacement: 'text-h3' },
  // Testimonials Quotes (restore these specifically because they should be huge)
  // Actually, we'll just let them become text-body or whatever, but text-4xl was replaced to text-h1-bold by previous? 
  // Wait, I won't replace text-xl or text-4xl blindly if they don't have md:
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  
  replacements.forEach(({pattern, replacement}) => {
    content = content.replace(pattern, replacement);
  });
  
  // Specific cleanups for redundant font weights since global classes handle them:
  // e.g. text-h1-bold font-bold -> text-h1-bold
  content = content.replace(/text-h1-bold font-extrabold/g, 'text-h1-bold');
  content = content.replace(/text-h1-bold font-bold/g, 'text-h1-bold');
  content = content.replace(/text-h2-bold font-bold/g, 'text-h2-bold');
  content = content.replace(/text-h3-bold font-bold/g, 'text-h3-bold');
  content = content.replace(/text-h5 font-bold/g, 'text-h5-bold');
  content = content.replace(/text-body font-bold/g, 'text-h5-bold'); // Since body is 16px normal, h5-bold is 16px bold
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
});
