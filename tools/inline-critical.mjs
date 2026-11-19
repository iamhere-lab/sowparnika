// NOTE: tested 19 Nov 2026 - inlining 47 KB of critical CSS made the page slower (bigger HTML), so it is NOT applied. Kept for reference.
// Inlines the CSS that index.html actually uses into a <style> block and loads the full
// stylesheets without blocking the first paint. Safe to re-run after any HTML/CSS edit:
// it first undoes its previous run.  Usage (from the repo root):
//   npm i --no-save beasties && node tools/inline-critical.mjs
import fs from 'node:fs';
import Beasties from 'beasties';

const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

// Undo a previous run
html = html.replace(/<!--critical-->[\s\S]*?<!--\/critical-->\n?/g, '');
if (!html.includes('href="assets/css/fonts.css"')) html = html.replace('<link rel="stylesheet" href="assets/css/styles.css"', '<link rel="stylesheet" href="assets/css/fonts.css">\n<link rel="stylesheet" href="assets/css/styles.css"');
html = html.replace(/<link rel="stylesheet" href="(assets\/css\/[^"]+)" media="print" onload="this\.media='all'">(?:<noscript><link rel="stylesheet" href="\1"><\/noscript>)?/g,
                    '<link rel="stylesheet" href="$1">');

const beasties = new Beasties({ path: '.', publicPath: '', preload: 'media', noscriptFallback: true,
                                inlineFonts: true, pruneSource: false, compress: true, logLevel: 'warn' });
let out = await beasties.process(html);
out = out.replace(/<style>/, '<!--critical--><style>').replace(/<\/style>(?![\s\S]*<\/style>[\s\S]*<\/head>)/, '</style><!--/critical-->');
// @font-face rules go inline too (small), so the preloaded fonts are used on first paint
const faces = fs.readFileSync('assets/css/fonts.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n/g, '');
out = out.replace('<!--critical--><style>', '<!--critical--><style>' + faces);
out = out.replace(/<link rel="stylesheet" href="assets\/css\/fonts\.css"[^>]*>(?:<noscript>[\s\S]*?<\/noscript>)?\n?/, '');
fs.writeFileSync(file, out);
console.log('critical CSS inlined:', (out.match(/<!--critical--><style>([\s\S]*?)<\/style>/) || ['', ''])[1].length, 'bytes');
