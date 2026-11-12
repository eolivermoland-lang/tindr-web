// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Tight box and vertices from crates/tindr-gfx/src/logo.rs (D31). */
export const MARK_VIEWBOX = '0 0 74575 33912';
export const MARK_LEFT =
  '31204,0 44143,14078 39870,19162 33895,13011 20479,33912 0,33912';
export const MARK_RIGHT =
  '51047,7319 74575,33912 70957,33912 53780,20921 46694,33912 28561,33912';

export type MarkLayer = 'both' | 'left' | 'right';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tindr-mark',
  templateUrl: './tindr-mark.html',
  styleUrl: './tindr-mark.scss',
})
export class TindrMark {
  /** Which peak to draw. The hero uses the two peaks as separate layers. */
  readonly layer = input<MarkLayer>('both');
  readonly label = input('Tindr');

  readonly viewBox = MARK_VIEWBOX;
  readonly leftPoints = MARK_LEFT;
  readonly rightPoints = MARK_RIGHT;

  protected readonly showLeft = computed(() => this.layer() !== 'right');
  protected readonly showRight = computed(() => this.layer() !== 'left');
}
