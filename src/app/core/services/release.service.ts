// SPDX-License-Identifier: Apache-2.0

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

import type { ArchId, Release, ReleaseManifest } from '../models/release';
import { isPlaceholder, parseReleaseManifest, releasesForArch } from './release-parser';

/** Default path for the release manifest, served from /public. */
export const RELEASE_MANIFEST_URL = '/releases.json';

@Injectable({ providedIn: 'root' })
export class ReleaseService {
  private readonly http = inject(HttpClient);

  private readonly manifest$: Observable<ReleaseManifest> = this.http
    .get<unknown>(RELEASE_MANIFEST_URL)
    .pipe(map((body) => parseReleaseManifest(body)), shareReplay({ bufferSize: 1, refCount: false }));

  /** The typed, validated manifest. */
  load(): Observable<ReleaseManifest> {
    return this.manifest$;
  }

  list(): Observable<readonly Release[]> {
    return this.manifest$.pipe(map((manifest) => manifest.releases));
  }

  byArch(arch: ArchId): Observable<readonly Release[]> {
    return this.manifest$.pipe(map((manifest) => releasesForArch(manifest, arch)));
  }

  placeholders(): Observable<readonly Release[]> {
    return this.manifest$.pipe(map((manifest) => manifest.releases.filter(isPlaceholder)));
  }
}
