// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-section',
  templateUrl: './site-section.html',
  styleUrl: './site-section.scss',
})
export class SiteSection {
  readonly sectionId = input<string | undefined>(undefined);
  readonly eyebrow = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly lede = input<string | undefined>(undefined);
  readonly tone = input<'default' | 'raised' | 'deep'>('default');
}
