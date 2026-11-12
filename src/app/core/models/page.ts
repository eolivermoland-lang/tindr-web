// SPDX-License-Identifier: Apache-2.0

export interface PublicPage {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  readonly priority: number;
}

export interface SiteCatalog {
  readonly origin: string;
  readonly ogImage: string;
  readonly siteName: string;
  readonly pages: readonly PublicPage[];
}

export interface NavItem {
  readonly path: string;
  readonly label: string;
  readonly emphasis?: boolean;
}
