# preferred-pm

## 5.0.1

### Patch Changes

- 1ae3d79: Detect pnpm inside a pnpm workspace via `pnpm-workspace.yaml`, not only `pnpm-lock.yaml`. The README already documents that pnpm is preferred inside a pnpm workspace, but the lookup only searched for `pnpm-lock.yaml`. Repositories that set `lockfile: false` (no committed lockfile) were therefore not detected as pnpm projects. The directory walk now also looks for `pnpm-workspace.yaml`, which pnpm v10+ requires for workspace/config. Fixes #197.

## 5.0.0

### Major Changes

- f3776b0: convert to esm

### Patch Changes

- Updated dependencies [f3776b0]
  - which-pm@4.0.0

## 3.1.4

- Update which-pm

## 3.0.3

### Patch Changes

- 094cecc: Fix types.

## 3.0.2

### Patch Changes

- 17d5363: Update find-up to v5.

## 3.0.1

### Patch Changes

- f9c6c94: Pin find-yarn-workspace-root2 to version 1.2.16. Newer versions of the package have @types/node in peer dependencies.

## 3.0.0

### Major Changes

- 49172aa: Dropped support of Node.js<10.

### Minor Changes

- d50a9b7: Detects a pnpm workspace.
- cec674b: Add types.
- 727f01a: Yarn is the preferred package manager inside a Yarn workspace.
