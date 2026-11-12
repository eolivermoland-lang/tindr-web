#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
/**
 * Builds public/sitemap.xml from the same site catalog the Angular
 * router and SeoService read, so the sitemap cannot drift from the routes.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = join(root, 'src/app/core/data/site-catalog.json');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

if (!catalog.origin || !Array.isArray(catalog.pages)) {
  throw new Error('site-catalog.json is missing origin or pages.');
}

const today = new Date().toISOString().slice(0, 10);
const body = catalog.pages
  .map((page) => {
    const loc = new URL(page.path, catalog.origin).href;
    const priority = Number(page.priority).toFixed(1);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const out = join(root, 'public/sitemap.xml');
writeFileSync(out, xml.endsWith('\n') ? xml : `${xml}\n`, 'utf8');
console.log(`Wrote ${catalog.pages.length} URLs to public/sitemap.xml`);
