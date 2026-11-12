// SPDX-License-Identifier: Apache-2.0

import { Routes } from '@angular/router';

/**
 * Public routes. Paths must stay in sync with src/app/core/data/site-catalog.json
 * (enforced by catalog.spec.ts). The sitemap script reads that catalog too.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.AboutPage),
  },
  {
    path: 'architecture',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'roadmap',
    loadComponent: () => import('./features/roadmap/roadmap').then((m) => m.RoadmapPage),
  },
  {
    path: 'docs',
    loadComponent: () => import('./features/docs/docs').then((m) => m.DocsPage),
  },
  {
    path: 'download',
    loadComponent: () => import('./features/download/download').then((m) => m.DownloadPage),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFoundPage),
  },
];
