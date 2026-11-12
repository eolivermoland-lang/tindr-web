// SPDX-License-Identifier: Apache-2.0

/** Architecture names used everywhere on the site, matching the OS spelling. */
export const ARCHES = ['x86-64', 'AArch64'] as const;

export type ArchId = (typeof ARCHES)[number];

export type ReleaseKind = 'placeholder' | 'image';

export interface Release {
  readonly id: string;
  readonly arch: ArchId;
  readonly label: string;
  readonly version: string;
  readonly kind: ReleaseKind;
  readonly filename: string;
  readonly url: string;
  readonly sha256: string;
  readonly sizeBytes: number;
  readonly notes: string;
}

export interface ReleaseManifest {
  readonly version: string;
  readonly updated: string;
  readonly notice: string;
  readonly releases: readonly Release[];
}

export const RELEASE_KINDS: readonly ReleaseKind[] = ['placeholder', 'image'];
