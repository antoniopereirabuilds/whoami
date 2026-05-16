// Renders /cv to a print-quality A4 PDF.
//
// 1. Spins up a tiny static server over dist/ at /whoami/ to match production base.
// 2. Launches headless Chromium, navigates to /whoami/cv, waits for fonts.
// 3. Saves dist/Antonio-Pereira-CV.pdf using @page rules from cv.astro.

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const BASE = '/whoami';
const OUT = path.join(DIST, 'Antonio-Pereira-CV.pdf');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

async function resolveFile(reqPath) {
  let pathname = decodeURIComponent(reqPath.split('?')[0]);
  if (pathname.startsWith(BASE)) pathname = pathname.slice(BASE.length);
  if (pathname === '' || pathname === '/') pathname = '/index.html';

  const candidates = [
    path.join(DIST, pathname),
    path.join(DIST, pathname, 'index.html'),
    path.join(DIST, pathname + '.html'),
  ];

  for (const c of candidates) {
    try {
      const stat = await fs.stat(c);
      if (stat.isFile()) return c;
    } catch {}
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? '/');
  if (!file) {
    res.statusCode = 404;
    res.end('not found');
    return;
  }
  const ext = path.extname(file).toLowerCase();
  res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
  res.end(await fs.readFile(file));
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const url = `http://127.0.0.1:${port}${BASE}/cv`;

console.log(`[pdf] rendering ${url}`);

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  // Ensure web fonts are fully loaded before printing
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const stat = await fs.stat(OUT);
console.log(`[pdf] wrote ${OUT} (${(stat.size / 1024).toFixed(1)} KB)`);
