// SPDX-License-Identifier: Apache-2.0

import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { SITE_ORIGIN } from '../data/catalog';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let seo: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), SeoService],
    });
    seo = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('uses the public domain for canonical URLs and og:url', () => {
    expect(seo.canonicalFor('/')).toBe(`${SITE_ORIGIN}/`);
    expect(seo.canonicalFor('/download')).toBe(`${SITE_ORIGIN}/download`);
    expect(seo.canonicalFor('/download/')).toBe(`${SITE_ORIGIN}/download`);
  });

  it('sets title, canonical and Open Graph tags for a known route', () => {
    seo.apply('/download');
    expect(title.getTitle()).toBe('Download \u2013 Tindr');
    expect(meta.getTag('property="og:url"')?.content).toBe(`${SITE_ORIGIN}/download`);
    expect(meta.getTag('property="og:image"')?.content).toBe(`${SITE_ORIGIN}/brand/og-image.png`);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe(`${SITE_ORIGIN}/download`);
  });

  it('marks unknown routes as not found and noindex', () => {
    seo.apply('/does-not-exist');
    expect(title.getTitle()).toBe('Page not found \u2013 Tindr');
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, nofollow');
  });
});
