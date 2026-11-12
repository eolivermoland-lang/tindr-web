// SPDX-License-Identifier: Apache-2.0

import type { Milestone } from '../models/milestone';

/**
 * The 23 milestones from the Tindr master plan. Status reflects the project
 * as of November 2026: M0 to M2 are tagged, M3 is in progress, the rest is planned.
 */
export const MILESTONES: readonly Milestone[] = [
  {
    id: 'm0',
    code: 'M0',
    title: 'Foundation',
    summary:
      'Repository, pinned toolchain, just commands, a host-side test runner, and the documentation skeleton. A minimal UEFI app prints a pass line in QEMU on both architectures.',
    status: 'done',
  },
  {
    id: 'm1',
    code: 'M1',
    title: 'Boot and screen',
    summary:
      'A UEFI loader that loads the kernel, hands over memory, framebuffer and firmware tables, then a calm boot screen, a serial log, and a carefully designed panic screen. Drawn with the Tindr typeface.',
    status: 'done',
  },
  {
    id: 'm2',
    code: 'M2',
    title: 'Memory and interrupts',
    summary:
      'A physical frame allocator, a kernel heap, our own page tables with write xor execute, exception vectors, interrupt controllers found through ACPI or the device tree, and a 1 kHz timer.',
    status: 'done',
  },
  {
    id: 'm3',
    code: 'M3',
    title: 'Weaves and syscalls',
    summary:
      'The kernel moves into the higher half and starts running user code. A Weave is a schedulable thread. User Weaves are preempted every 10 ms. A Weave that faults is killed; the kernel keeps running.',
    status: 'current',
  },
  {
    id: 'm4',
    code: 'M4',
    title: 'Tasks, Gates, Ledger, Registry',
    summary:
      'Separate address spaces, handles with rights, messages and calls over Gates, shared memory, and ELF loading. Planned.',
    status: 'planned',
  },
  {
    id: 'm5',
    code: 'M5',
    title: 'SMP and scheduler',
    summary:
      'Every CPU, per-CPU queues, priorities, fair distribution, TLB shootdown, and futex-like waiting. Planned.',
    status: 'planned',
  },
  {
    id: 'm6',
    code: 'M6',
    title: 'Hearth and user space',
    summary:
      'A libc, a Rust runtime, Hearth to supervise services and restart them after a crash, an initrd, and crash reports. Planned.',
    status: 'planned',
  },
  {
    id: 'm7',
    code: 'M7',
    title: 'Drivers',
    summary:
      'A driver model, PCIe, virtio, keyboard and mouse. A killed driver is restarted without taking the machine down. Planned.',
    status: 'planned',
  },
  {
    id: 'm8',
    code: 'M8',
    title: 'TindrFS',
    summary:
      'A virtual file system, TindrFS, GPT, FAT reading, a block cache, and a file API that stays consistent through power loss. Planned.',
    status: 'planned',
  },
  {
    id: 'm9',
    code: 'M9',
    title: 'Unix layer and shell',
    summary:
      'Processes, pipes, a TTY, a shell, and our own core utilities. Planned.',
    status: 'planned',
  },
  {
    id: 'm10',
    code: 'M10',
    title: 'Graphics',
    summary:
      'A vector library, a font rasteriser, a PNG decoder, a compositor with damage tracking and vsync, a Norwegian keyboard layout, and HiDPI. Planned.',
    status: 'planned',
  },
  {
    id: 'm11',
    code: 'M11',
    title: 'UI toolkit',
    summary:
      'Views, state, layout, spring animation, light and dark mode, an accessibility tree, keyboard navigation, and a component library. Planned.',
    status: 'planned',
  },
  {
    id: 'm12',
    code: 'M12',
    title: 'Desktop and apps',
    summary:
      'Window management, a command palette, notifications, settings, a file manager, a terminal, a text editor, and the first system apps. Planned.',
    status: 'planned',
  },
  {
    id: 'm13',
    code: 'M13',
    title: 'Networking',
    summary:
      'Our own TCP/IP stack, sockets, TLS 1.3, and an HTTP client. Planned.',
    status: 'planned',
  },
  {
    id: 'm14',
    code: 'M14',
    title: 'App model and security',
    summary:
      'Packaged apps with a manifest, a sandbox, a file picker that hands out access, signing, ASLR, write xor execute, and a syscall fuzzer. Planned.',
    status: 'planned',
  },
  {
    id: 'm15',
    code: 'M15',
    title: 'System image and update',
    summary:
      'A read-only system volume, A/B updates with automatic rollback, a recovery mode, and an installer. Planned.',
    status: 'planned',
  },
  {
    id: 'm16',
    code: 'M16',
    title: 'Performance',
    summary:
      'Profiling and work until the ten promises are met, including a tickless kernel. Planned.',
    status: 'planned',
  },
  {
    id: 'm17',
    code: 'M17',
    title: 'Real hardware',
    summary:
      'USB, NVMe, AHCI, Ethernet, audio, ACPI, and boot images for a physical PC and a virtual machine. Planned.',
    status: 'planned',
  },
  {
    id: 'm18',
    code: 'M18',
    title: 'Sound and media',
    summary:
      'A low-latency audio service with mixing, plus WAV and JPEG. Planned.',
    status: 'planned',
  },
  {
    id: 'm19',
    code: 'M19',
    title: 'Compatibility and SDK',
    summary:
      'Enough of a POSIX layer to port open software, a WASM engine, an SDK, and developer documentation. Planned.',
    status: 'planned',
  },
  {
    id: 'm20',
    code: 'M20',
    title: 'The Tindr experience',
    summary:
      'Instant system search, file time travel, undo everywhere, clipboard history, session restore, and built-in backup. Planned.',
    status: 'planned',
  },
  {
    id: 'm21',
    code: 'M21',
    title: 'Browser',
    summary:
      'Our own engine for a subset of HTML and CSS, with images, links and forms. A JavaScript interpreter is a stretch goal. Planned.',
    status: 'planned',
  },
  {
    id: 'm22',
    code: 'M22',
    title: 'Tindr 1.0',
    summary:
      'A screen-reader API, high contrast, Norwegian and English, a welcome flow, user documentation, and reproducible builds. Planned.',
    status: 'planned',
  },
];

export const PROMISES: readonly string[] = [
  'Cold start to a usable desktop in under 3 s.',
  'An idle desktop uses under 150 MB of memory.',
  'Core apps show their first frame in under 100 ms.',
  'The compositor holds 60 frames a second, with 99 percent of frames under 16.6 ms.',
  'System search answers in under 50 ms over 100,000 files.',
  'A crash in a driver, a service or an app never takes the system down.',
  'Power loss never corrupts the file system. Updates are atomic and roll back on failure.',
  'Every app is sandboxed by default and reaches only what it has been given.',
  'No telemetry, ads, or forced accounts. Uninstall leaves nothing behind.',
  'The whole system image is under 300 MB.',
];
