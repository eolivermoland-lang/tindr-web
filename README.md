<!-- SPDX-License-Identifier: Apache-2.0 -->

# Tindr website

The public website for [Tindr](https://tindr.konfidensiell.no), an original
desktop operating system for x86-64 and AArch64, written in Rust from an empty
directory.

The site is a parallax marketing and documentation front for the operating
system. It uses the same design tokens, official mark and Fjord Sans typeface
as the OS itself. Downloadable images today are placeholders; real UEFI disk
images will take their place later.

This repository is the website only. It does not build the kernel.

## Domain and SEO

The canonical site is `https://tindr.konfidensiell.no`.

- `public/robots.txt` allows all crawlers and points at the sitemap.
- `public/sitemap.xml` is generated from `src/app/core/data/site-catalog.json`
  by `scripts/generate-sitemap.mjs`, the same catalogue the router and the
  `SeoService` use. `npm run build` and `npm start` regenerate it first.
- Every public route gets a canonical URL, Open Graph tags and `og:url` on
  that domain.

## Stack

- Angular 22, standalone components, strict TypeScript, SCSS
- Feature folders with lazy-loaded routes
- Vitest for unit tests

## Architecture

```
src/app/
  core/
    data/          site catalogue, release manifest, milestone copy
    models/        typed records (pages, releases, milestones)
    services/      ReleaseService, ParallaxService, SeoService
    directives/    scroll parallax (requestAnimationFrame)
  shared/components/
    site-header, site-footer, tindr-mark, site-section
  features/
    home, about, roadmap, docs, download, not-found
public/
  brand/           official mark, Open Graph image, icons
  downloads/       placeholder file and the official mark
  fonts/fjord-sans Fjord Sans (self-hosted WOFF2 and OTF)
  releases.json    the same manifest the download page reads
```

`ReleaseService` fetches `/releases.json` and validates it with
`parseReleaseManifest`. Both architecture entries currently point at
`public/downloads/tindr-os-placeholder.txt`, marked as placeholders, with
SHA-256 and size in the manifest. The official logo sits beside that file.

`ParallaxService` runs a single animation frame loop, shared by the
`tindrParallax` directive. When `prefers-reduced-motion: reduce` is set,
every layer offset is zero.

Design tokens live as CSS custom properties in `src/styles/_tokens.scss` and
follow the OS file `design/tokens.toml`: polar night, fjord water, snow, rime,
glacier ice, moss, cloudberry and lingonberry.

## Routes

| Path        | Page                                      |
| ----------- | ----------------------------------------- |
| `/`         | Parallax home                             |
| `/about`    | Architecture and principles (`/architecture` redirects here) |
| `/roadmap`  | All 23 milestones, with status            |
| `/docs`     | A longer public account of the project    |
| `/download` | x86-64 and AArch64 downloads              |

Milestone status on this site reflects the project as of November 2026:
M0 to M2 are done, M3 is in progress, M4 to M22 are planned. The ten
performance and trust promises are aims, not results.

## Development

```bash
npm install
npm start          # regenerates the sitemap, then serves the app
npm test           # Vitest, once, via the Angular unit-test builder
npm run build      # production build in dist/tindr-web/browser
```

Node 20 or later is required. The default test runner is Vitest with jsdom,
which is what `ng new --test-runner=vitest` generated. There is no Karma
or ChromeHeadless target.

## Brand

Fjord Sans and the two-peak mark were designed by Oliver Torden in 2026. He
owns both and licenses them with the project under Apache-2.0. Tindr Sans is
the operating system's fallback face; this site uses a system sans for the
few glyphs Fjord Sans does not yet contain.

## Licence

Apache License 2.0. See `LICENSE` and `NOTICE`.
