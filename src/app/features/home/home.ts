// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MILESTONES, PROMISES } from '../../core/data/milestones';
import { ParallaxDirective } from '../../core/directives/parallax.directive';
import { SiteSection } from '../../shared/components/site-section/site-section';
import { TindrMark } from '../../shared/components/tindr-mark/tindr-mark';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [RouterLink, ParallaxDirective, SiteSection, TindrMark],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly current = MILESTONES.find((item) => item.status === 'current');
  readonly doneCount = MILESTONES.filter((item) => item.status === 'done').length;
  readonly total = MILESTONES.length;
  readonly promises = PROMISES;
  readonly preview = MILESTONES.filter((item) => item.status !== 'planned').concat(
    MILESTONES.filter((item) => item.status === 'planned').slice(0, 3),
  );
}
