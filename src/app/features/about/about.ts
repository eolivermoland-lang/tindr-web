// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SiteSection } from '../../shared/components/site-section/site-section';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  imports: [RouterLink, SiteSection],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutPage {}
