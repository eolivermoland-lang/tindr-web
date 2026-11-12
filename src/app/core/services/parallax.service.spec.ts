// SPDX-License-Identifier: Apache-2.0

import { TestBed } from '@angular/core/testing';

import { ParallaxService } from './parallax.service';

describe('ParallaxService', () => {
  let service: ParallaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParallaxService);
  });

  afterEach(() => {
    service.disconnect();
  });

  it('returns zero offset when reduced motion is preferred', () => {
    service.setReducedMotion(true);
    service.peek(400);
    expect(service.offsetFor(0.5)).toBe(0);
  });

  it('multiplies scroll by the layer speed when motion is allowed', () => {
    service.setReducedMotion(false);
    service.peek(200);
    expect(service.offsetFor(0.3)).toBeCloseTo(60);
    expect(service.offsetFor(1, 80)).toBe(80);
  });

  it('samples scroll on the next animation frame after connect', () => {
    const frames: FrameRequestCallback[] = [];
    const win = window as Window & { requestAnimationFrame: typeof requestAnimationFrame };
    const originalRaf = win.requestAnimationFrame;
    win.requestAnimationFrame = (cb: FrameRequestCallback) => {
      frames.push(cb);
      return 1;
    };
    Object.defineProperty(win, 'scrollY', { configurable: true, value: 120 });
    Object.defineProperty(win, 'innerHeight', { configurable: true, value: 800 });
    Object.defineProperty(win, 'matchMedia', {
      configurable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
      }),
    });

    service.connect();
    expect(service.scrollY()).toBe(120);

    Object.defineProperty(win, 'scrollY', { configurable: true, value: 240 });
    window.dispatchEvent(new Event('scroll'));
    expect(frames.length).toBeGreaterThan(0);
    frames.at(-1)?.(0);
    expect(service.scrollY()).toBe(240);

    win.requestAnimationFrame = originalRaf;
  });
});
