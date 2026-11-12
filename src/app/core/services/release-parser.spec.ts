// SPDX-License-Identifier: Apache-2.0

import { ARCHES } from '../models/release';
import {
  formatByteSize,
  isPlaceholder,
  parseReleaseManifest,
  releasesForArch,
} from './release-parser';
import fixture from '../data/releases.json';

describe('parseReleaseManifest', () => {
  it('accepts the shipped manifest and keeps both architectures', () => {
    const manifest = parseReleaseManifest(fixture);
    expect(manifest.version).toBe('0.1-dev');
    expect(manifest.releases).toHaveLength(2);
    expect(manifest.releases.map((item) => item.arch).sort()).toEqual([...ARCHES].sort());
    expect(manifest.releases.every(isPlaceholder)).toBe(true);
  });

  it('rejects an empty document, a missing SHA, and a duplicate id', () => {
    expect(() => parseReleaseManifest(null)).toThrow(/must be an object/);
    expect(() => parseReleaseManifest({ version: '1', updated: '2026-01-01', notice: 'n', releases: [] })).toThrow(
      /at least one/,
    );

    const valid = parseReleaseManifest(fixture);
    const [first] = valid.releases;
    const clone = { ...valid, releases: [{ ...first, sha256: 'abc' }] };
    expect(() => parseReleaseManifest(clone)).toThrow(/SHA-256/);

    const dup = { ...valid, releases: [first, { ...first }] };
    expect(() => parseReleaseManifest(dup)).toThrow(/duplicated/);
  });

  it('filters by architecture and formats sizes', () => {
    const manifest = parseReleaseManifest(fixture);
    expect(releasesForArch(manifest, 'x86-64')).toHaveLength(1);
    expect(releasesForArch(manifest, 'AArch64')[0]?.arch).toBe('AArch64');
    expect(formatByteSize(368)).toBe('368 B');
    expect(formatByteSize(12_400)).toBe('12.4 kB');
    expect(formatByteSize(2_000_000)).toBe('2.0 MB');
  });
});
