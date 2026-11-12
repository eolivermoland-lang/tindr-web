// SPDX-License-Identifier: Apache-2.0

import { DOCUMENT } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { SITE_NAME, canonicalUrl, normalisePath, ogImageUrl, pageForPath } from '../data/catalog';
import type { PublicPage } from '../models/page';

const NOT_FOUND: PublicPage = {
  path: '/404',
  title: 'Page not found',
  description: 'This page is not part of the Tindr site.',
  changeFrequency: 'never',
  priority: 0,
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private subscription: Subscription | null = null;

  connect(): void {
    if (this.subscription) {
      return;
    }
    this.apply(this.router.url);
    this.subscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.apply(event.urlAfterRedirects));
  }

  disconnect(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  pageFor(url: string): PublicPage {
    return pageForPath(url) ?? NOT_FOUND;
  }

  documentTitleFor(page: PublicPage): string {
    if (page.path === '/') {
      return SITE_NAME;
    }
    return `${page.title} \u2013 ${SITE_NAME}`;
  }

  canonicalFor(path: string): string {
    if (path === '/404') {
      return canonicalUrl('/');
    }
    return canonicalUrl(normalisePath(path));
  }

  apply(url: string): void {
    const page = this.pageFor(url);
    const title = this.documentTitleFor(page);
    const canonical = this.canonicalFor(page.path);
    const image = ogImageUrl();
    const indexable = page.path !== '/404';

    this.title.setTitle(title);
    this.upsert('name', 'description', page.description);
    this.upsert('name', 'robots', indexable ? 'index, follow' : 'noindex, nofollow');
    this.upsert('property', 'og:type', 'website');
    this.upsert('property', 'og:site_name', SITE_NAME);
    this.upsert('property', 'og:title', title);
    this.upsert('property', 'og:description', page.description);
    this.upsert('property', 'og:url', canonical);
    this.upsert('property', 'og:image', image);
    this.upsert('property', 'og:image:width', '1200');
    this.upsert('property', 'og:image:height', '630');
    this.upsert('name', 'twitter:card', 'summary_large_image');
    this.upsert('name', 'twitter:title', title);
    this.upsert('name', 'twitter:description', page.description);
    this.upsert('name', 'twitter:image', image);
    this.setCanonical(canonical);
  }

  private upsert(kind: 'name' | 'property', key: string, content: string): void {
    const selector = kind === 'name' ? `name="${key}"` : `property="${key}"`;
    this.meta.updateTag({ [kind]: key, content } as { name?: string; property?: string; content: string }, selector);
  }

  private setCanonical(href: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
