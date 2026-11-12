// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

import { NAV_ITEMS } from '../../../core/data/catalog';
import { ParallaxService } from '../../../core/services/parallax.service';
import { TindrMark } from '../tindr-mark/tindr-mark';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, TindrMark],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  private readonly router = inject(Router);
  private readonly parallax = inject(ParallaxService);

  readonly items = NAV_ITEMS;
  readonly menuOpen = signal(false);

  private readonly path = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('?')[0] ?? '/'),
    ),
    { initialValue: this.router.url },
  );

  protected readonly isHome = computed(() => {
    const url = this.path() ?? '/';
    return url === '/' || url.startsWith('/#');
  });

  protected readonly condensed = computed(() => this.parallax.scrollY() > 16 || !this.isHome());

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
