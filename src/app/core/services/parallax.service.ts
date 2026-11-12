// SPDX-License-Identifier: Apache-2.0

import { DOCUMENT } from '@angular/core';
import { Injectable, inject, signal } from '@angular/core';

/**
 * A single requestAnimationFrame loop that samples scroll position
 * and reports it to parallax layers. When the user prefers reduced
 * motion, every offset is zero and the loop still tracks scroll so
 * UI chrome (such as the header) can react without moving layers.
 */
@Injectable({ providedIn: 'root' })
export class ParallaxService {
  private readonly document = inject(DOCUMENT);

  private readonly reducedMotionState = signal(false);
  private readonly scrollYState = signal(0);
  private readonly viewportHeightState = signal(0);

  readonly reducedMotion = this.reducedMotionState.asReadonly();
  readonly scrollY = this.scrollYState.asReadonly();
  readonly viewportHeight = this.viewportHeightState.asReadonly();

  private connected = false;
  private pending = false;
  private frame = 0;
  private media: MediaQueryList | null = null;

  private readonly onScroll = (): void => {
    this.schedule();
  };

  private readonly onResize = (): void => {
    this.schedule();
  };

  private readonly onMedia = (): void => {
    this.syncMedia();
  };

  connect(): void {
    if (this.connected) {
      return;
    }
    const win = this.document.defaultView;
    if (!win) {
      return;
    }
    this.connected = true;
    this.media = typeof win.matchMedia === 'function'
      ? win.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    this.media?.addEventListener('change', this.onMedia);
    win.addEventListener('scroll', this.onScroll, { passive: true });
    win.addEventListener('resize', this.onResize, { passive: true });
    this.syncMedia();
    this.sample(win);
  }

  disconnect(): void {
    if (!this.connected) {
      return;
    }
    const win = this.document.defaultView;
    this.media?.removeEventListener('change', this.onMedia);
    this.media = null;
    if (win) {
      win.removeEventListener('scroll', this.onScroll);
      win.removeEventListener('resize', this.onResize);
      if (this.pending) {
        win.cancelAnimationFrame(this.frame);
      }
    }
    this.pending = false;
    this.frame = 0;
    this.connected = false;
  }

  /**
   * Pixel offset for a layer. A speed of 0.3 means the layer moves
   * 30 percent as far as the page, so it appears to lag behind.
   * Reduced motion always returns 0.
   */
  offsetFor(speed: number, scrollY: number = this.scrollYState()): number {
    if (this.reducedMotionState()) {
      return 0;
    }
    return scrollY * speed;
  }

  /** Test hook: apply a sampled scroll without waiting for a frame. */
  peek(scrollY: number, viewportHeight?: number): void {
    this.scrollYState.set(scrollY);
    if (viewportHeight !== undefined) {
      this.viewportHeightState.set(viewportHeight);
    }
  }

  /** Test hook: force the reduced-motion flag. */
  setReducedMotion(value: boolean): void {
    this.reducedMotionState.set(value);
  }

  private schedule(): void {
    if (this.pending) {
      return;
    }
    const win = this.document.defaultView;
    if (!win) {
      return;
    }
    this.pending = true;
    this.frame = win.requestAnimationFrame(() => {
      this.pending = false;
      this.sample(win);
    });
  }

  private sample(win: Window): void {
    this.scrollYState.set(win.scrollY);
    this.viewportHeightState.set(win.innerHeight);
  }

  private syncMedia(): void {
    this.reducedMotionState.set(this.media?.matches === true);
  }
}
