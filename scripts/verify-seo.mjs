import fs from 'node:fs';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const snapshot = JSON.parse(fs.readFileSync('src/data/portfolio.generated.json', 'utf8'));
const origin = 'https://jules-pecaoco.github.io';
const paths = ['/', '/about/', '/projects/', '/resume/', '/contact/',
  ...snapshot.projects.filter(p => p.visible !== false).map(p => `/projects/${p.slug}/`),
  ...(snapshot.events.some(e => e.visible) ? ['/events/'] : [])];
const titles = new Set();
const descriptions = new Set();
for (const path of paths) {
  const html = fs.readFileSync(`dist${path}index.html`, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]*)"/)?.[1];
  assert.ok(title && description, `Missing metadata: ${path}`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `Duplicate metadata: ${path}`);
  titles.add(title); descriptions.add(description);
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `Canonical mismatch: ${path}`);
  assert.ok(html.includes('content="summary_large_image"'), `Missing large social card: ${path}`);
  assert.ok(html.includes(`${origin}/images/og/portfolio.jpg`), `Missing social image: ${path}`);
  assert.ok(!html.includes('content="noindex'), `Unexpected noindex: ${path}`);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] || 'null');
  assert.ok(schema?.['@graph'].some(node => node['@type'] === 'Person'));
  if (path === '/about/') assert.ok(schema['@graph'].some(node => node['@type'] === 'ProfilePage'));
  if (path.startsWith('/projects/') && path !== '/projects/') {
    assert.ok(schema['@graph'].some(node => node['@type'] === 'SoftwareSourceCode'));
  }
}
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(new Set(urls), new Set(paths.map(path => origin + path)));
for (const date of sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) assert.ok(!Number.isNaN(Date.parse(date[1])));
const missing = fs.readFileSync('dist/404.html', 'utf8');
assert.ok(missing.includes('content="noindex,follow"') && !missing.includes('rel="canonical"'));
assert.ok(fs.readFileSync('dist/admin/index.html', 'utf8').includes('noindex'));
assert.ok(fs.readFileSync('dist/llms.txt', 'utf8').includes('Jules Alfonz Pecaoco'));
for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended']) {
  assert.ok(fs.readFileSync('dist/robots.txt', 'utf8').includes('User-agent: ' + bot));
}
const image = await sharp('dist/images/og/portfolio.jpg').metadata();
assert.equal(image.width, 1200); assert.equal(image.height, 630);
console.log(`Verified metadata, canonicals, social cards, entity graphs and sitemap for ${paths.length} indexable routes; crawler files, noindex pages and OG dimensions passed.`);
