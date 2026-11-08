// One-off generator: draws the Café Joseph wordmark as vector paths from Gilda Display.
// Output: src/components/LogoPaths.json (used by Logo.astro) and public/logo.svg.
import opentype from 'opentype.js';
import { readFileSync, writeFileSync } from 'node:fs';

const buf = readFileSync('node_modules/@fontsource/gilda-display/files/gilda-display-latin-400-normal.woff');
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

function tracked(text, size, tracking, y) {
  let x = 0; const parts = [];
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    const p = g.getPath(x, y, size);
    parts.push(p.toPathData(2));
    x += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d: parts.join(''), width: x - tracking * size };
}
const main = tracked('CAFÉ JOSEPH', 100, 0.12, 100);
const sub = tracked('PARIS', 30, 0.5, 0);
const W = Math.ceil(main.width);
const subX = (W - sub.width) / 2;
const subY = 152;
const gap = 18;
const lines = [
  [0, subY - 10, subX - gap, subY - 10],
  [subX + sub.width + gap, subY - 10, W, subY - 10],
];
const H = 160;
const out = { viewBox: `0 0 ${W} ${H}`, main: main.d, sub: sub.d, subTransform: `translate(${subX.toFixed(2)} ${subY})`, lines };
writeFileSync('src/components/LogoPaths.json', JSON.stringify(out));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${out.viewBox}" fill="#24474f"><path d="${out.main}"/><path transform="${out.subTransform}" d="${out.sub}"/>${lines.map(l => `<rect x="${l[0]}" y="${l[1] - 1}" width="${l[2] - l[0]}" height="2"/>`).join('')}</svg>`;
writeFileSync('public/logo.svg', svg);
console.log('logo', W, H, svg.length);
