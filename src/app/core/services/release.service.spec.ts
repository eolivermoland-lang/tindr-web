// SPDX-License-Identifier: Apache-2.0

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import fixture from '../data/releases.json';
import { RELEASE_MANIFEST_URL, ReleaseService } from './release.service';

describe('ReleaseService', () => {
  let service: ReleaseService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ReleaseService],
    });
    service = TestBed.inject(ReleaseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('loads a typed manifest from releases.json and shares the request', () => {
    const seen: string[] = [];
    service.load().subscribe((manifest) => seen.push(manifest.version));
    service.list().subscribe((releases) => seen.push(String(releases.length)));

    const request = http.expectOne(RELEASE_MANIFEST_URL);
    expect(request.request.method).toBe('GET');
    request.flush(fixture);

    expect(seen).toEqual(['0.1-dev', '2']);
  });

  it('surfaces a parser error when the payload is not a manifest', () => {
    let message = '';
    service.load().subscribe({
      next: () => {
        throw new Error('should not succeed');
      },
      error: (err: unknown) => {
        message = err instanceof Error ? err.message : String(err);
      },
    });
    http.expectOne(RELEASE_MANIFEST_URL).flush({ hello: 'no' });
    expect(message).toMatch(/at least one release|must be an object|must list/i);
  });
});
