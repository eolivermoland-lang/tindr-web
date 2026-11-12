// SPDX-License-Identifier: Apache-2.0

import { ARCHES, RELEASE_KINDS, type ArchId, type Release, type ReleaseKind, type ReleaseManifest } from '../models/release';

const SHA256 = /^[0-9a-f]{64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Release manifest field "${key}" must be a non-empty string.`);
  }
  return value;
}

function isArchId(value: unknown): value is ArchId {
  return typeof value === 'string' && (ARCHES as readonly string[]).includes(value);
}

function isReleaseKind(value: unknown): value is ReleaseKind {
  return typeof value === 'string' && (RELEASE_KINDS as readonly string[]).includes(value);
}

function parseRelease(value: unknown, index: number): Release {
  if (!isRecord(value)) {
    throw new Error(`Release ${index} must be an object.`);
  }
  const arch = value['arch'];
  if (!isArchId(arch)) {
    throw new Error(`Release ${index} has an unknown architecture.`);
  }
  const kind = value['kind'];
  if (!isReleaseKind(kind)) {
    throw new Error(`Release ${index} has an unknown kind.`);
  }
  const sizeBytes = value['sizeBytes'];
  if (typeof sizeBytes !== 'number' || !Number.isInteger(sizeBytes) || sizeBytes < 0) {
    throw new Error(`Release ${index} is missing a valid size.`);
  }
  const sha256 = readString(value, 'sha256').toLowerCase();
  if (!SHA256.test(sha256)) {
    throw new Error(`Release ${index} has a malformed SHA-256.`);
  }
  return {
    id: readString(value, 'id'),
    arch,
    label: readString(value, 'label'),
    version: readString(value, 'version'),
    kind,
    filename: readString(value, 'filename'),
    url: readString(value, 'url'),
    sha256,
    sizeBytes,
    notes: readString(value, 'notes'),
  };
}

/** Parse and validate a releases.json document. Throws on any structural error. */
export function parseReleaseManifest(input: unknown): ReleaseManifest {
  if (!isRecord(input)) {
    throw new Error('Release manifest must be an object.');
  }
  const rawReleases = input['releases'];
  if (!Array.isArray(rawReleases) || rawReleases.length === 0) {
    throw new Error('Release manifest must list at least one release.');
  }
  const releases = rawReleases.map((entry, index) => parseRelease(entry, index));
  const seen = new Set<string>();
  for (const release of releases) {
    if (seen.has(release.id)) {
      throw new Error(`Release id "${release.id}" is duplicated.`);
    }
    seen.add(release.id);
  }
  return {
    version: readString(input, 'version'),
    updated: readString(input, 'updated'),
    notice: readString(input, 'notice'),
    releases,
  };
}

export function isPlaceholder(release: Release): boolean {
  return release.kind === 'placeholder';
}

export function releasesForArch(manifest: ReleaseManifest, arch: ArchId): readonly Release[] {
  return manifest.releases.filter((release) => release.arch === arch);
}

/** Human-readable size. Uses kB / MB so the copy stays within Fjord Sans. */
export function formatByteSize(bytes: number): string {
  if (bytes < 1000) {
    return `${bytes} B`;
  }
  if (bytes < 1_000_000) {
    const kilo = bytes / 1000;
    const shown = kilo >= 100 ? kilo.toFixed(0) : kilo.toFixed(1);
    return `${shown} kB`;
  }
  const mega = bytes / 1_000_000;
  const shown = mega >= 100 ? mega.toFixed(0) : mega.toFixed(1);
  return `${shown} MB`;
}
