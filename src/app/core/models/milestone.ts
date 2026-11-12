// SPDX-License-Identifier: Apache-2.0

export type MilestoneStatus = 'done' | 'current' | 'planned';

export interface Milestone {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly summary: string;
  readonly status: MilestoneStatus;
}
