// SPDX-License-Identifier: Apache-2.0

import { routes } from '../../app.routes';
import { NAV_ITEMS, PUBLIC_PAGES, SITE_ORIGIN, canonicalUrl, normalisePath } from './catalog';

describe('site catalog', () => {
  it('is published on the public domain', () => {
    expect(SITE_ORIGIN).toBe('https://tindr.konfidensiell.no');
    expect(canonicalUrl('/about')).toBe('https://tindr.konfidensiell.no/about');
    expect(normalisePath('/docs/?x=1#top')).toBe('/docs');
  });

  it('has a lazy route for every public page', () => {
    const routed = new Set(routes.map((route) => (route.path === undefined || route.path === '' ? '/' : `/${route.path}`)));
    for (const page of PUBLIC_PAGES) {
      expect(routed.has(page.path), `missing route for ${page.path}`).toBe(true);
    }
  });

  it('keeps primary navigation inside the public pages', () => {
    const paths = new Set(PUBLIC_PAGES.map((page) => page.path));
    for (const item of NAV_ITEMS) {
      expect(paths.has(item.path)).toBe(true);
    }
  });
});
