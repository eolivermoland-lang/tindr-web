// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROMISES } from '../../core/data/milestones';
import { SiteSection } from '../../shared/components/site-section/site-section';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-docs',
  imports: [RouterLink, SiteSection],
  templateUrl: './docs.html',
  styleUrl: './docs.scss',
})
export class DocsPage {
  readonly promises = PROMISES;
}
