// SPDX-License-Identifier: Apache-2.0

import type { NavItem, PublicPage, SiteCatalog } from '../models/page';
import raw from './site-catalog.json';

export const SITE_CATALOG = raw as SiteCatalog;

export const SITE_ORIGIN = SITE_CATALOG.origin;

export const SITE_NAME = SITE_CATALOG.siteName;

export const OG_IMAGE_PATH = SITE_CATALOG.ogImage;

export const PUBLIC_PAGES: readonly PublicPage[] = SITE_CATALOG.pages;

export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/about', label: 'About' },
  { path: '/roadmap', label: 'Roadmap' },
  { path: '/docs', label: 'Read' },
  { path: '/download', label: 'Download', emphasis: true },
];

/** Absolute URL for a site path, always on the public domain. */
export function canonicalUrl(path: string, origin: string = SITE_ORIGIN): string {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalised, origin).href;
}

/** Strip query and hash, then drop a trailing slash except for the root. */
export function normalisePath(url: string): string {
  const cut = url.split('#')[0]?.split('?')[0] ?? '/';
  if (cut === '' || cut === '/') {
    return '/';
  }
  return cut.endsWith('/') ? cut.slice(0, -1) : cut;
}

export function pageForPath(path: string): PublicPage | undefined {
  const normalised = normalisePath(path);
  return PUBLIC_PAGES.find((page) => page.path === normalised);
}

export function ogImageUrl(origin: string = SITE_ORIGIN): string {
  return canonicalUrl(OG_IMAGE_PATH, origin);
}
