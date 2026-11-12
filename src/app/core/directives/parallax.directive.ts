// SPDX-License-Identifier: Apache-2.0

import { Directive, ElementRef, effect, inject, input } from '@angular/core';

import { ParallaxService } from '../services/parallax.service';

/**
 * Binds an element to the shared parallax loop. The input is the layer speed
 * (0 keeps the element still, 1 tracks the page, values in between lag).
 */
@Directive({
  selector: '[tindrParallax]',
})
export class ParallaxDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly parallax = inject(ParallaxService);

  readonly speed = input(0.3, { alias: 'tindrParallax' });

  constructor() {
    effect(() => {
      const offset = this.parallax.offsetFor(this.speed(), this.parallax.scrollY());
      const node = this.element.nativeElement;
      if (offset === 0) {
        node.style.transform = '';
      } else {
        node.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
  }
}
