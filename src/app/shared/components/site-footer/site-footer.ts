// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NAV_ITEMS } from '../../../core/data/catalog';
import { TindrMark } from '../tindr-mark/tindr-mark';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-footer',
  imports: [RouterLink, TindrMark],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  readonly items = NAV_ITEMS;
  readonly year = 2026;
}
