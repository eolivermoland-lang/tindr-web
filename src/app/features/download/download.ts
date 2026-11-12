// SPDX-License-Identifier: Apache-2.0

import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

import { formatByteSize, isPlaceholder } from '../../core/services/release-parser';
import { ReleaseService } from '../../core/services/release.service';
import type { Release, ReleaseManifest } from '../../core/models/release';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-download',
  imports: [DatePipe],
  templateUrl: './download.html',
  styleUrl: './download.scss',
})
export class DownloadPage {
  private readonly releases = inject(ReleaseService);

  readonly error = signal<string | null>(null);
  readonly manifest = toSignal(
    this.releases.load().pipe(
      catchError((err: unknown) => {
        this.error.set(err instanceof Error ? err.message : 'The release list could not be loaded.');
        return of(null);
      }),
    ),
    { initialValue: null },
  );

  protected sizeOf(release: Release): string {
    return formatByteSize(release.sizeBytes);
  }

  protected placeholder(release: Release): boolean {
    return isPlaceholder(release);
  }

  protected notice(manifest: ReleaseManifest): string {
    return manifest.notice;
  }
}
