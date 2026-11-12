// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MILESTONES } from '../../core/data/milestones';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-roadmap',
  imports: [RouterLink],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.scss',
})
export class RoadmapPage {
  readonly milestones = MILESTONES;
  readonly done = MILESTONES.filter((item) => item.status === 'done').length;
  readonly current = MILESTONES.find((item) => item.status === 'current');
}
