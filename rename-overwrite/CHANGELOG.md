# rename-overwrite

## 6.0.2

### Patch Changes

- 574a558: Only import the exported files from fs-extra.

## 6.0.1

### Patch Changes

- 2af185a: Update fs-extra to v11.

## 5.0.3

### Patch Changes

- Updated dependencies [b70f4a9]
  - @zkochan/rimraf@3.0.2

## 5.0.1

### Patch Changes

- Updated dependencies [3fa8bea]
  - @zkochan/rimraf@3.0.0

## 5.0.0

- Sync rename overwrite locks up the process to wait and retry rename again.

## 4.0.4

### Patch Changes

- Retry on EPERM errors.

## 4.0.3

### Patch Changes

- 0300ee6: Support moving files and directories across devices.

## 4.0.2

### Patch Changes

- 2fd2422: Limit the number of retries.
- Updated dependencies [1d97370]
  - @zkochan/rimraf@2.1.2

## 4.0.1

### Patch Changes

- d36ad80: If the target file is a symlink, override it.

## 4.0.0

### Breaking Changes

- Drop Node.js 10 support

## 3.1.0

### Minor Changes

- bba9985: graceful-fs and mz removed from dependencies.

## 3.0.0

### Major Changes

- 7624a45: Drop Node.js 8 support.

### Minor Changes

- b0e76c1: Add TypeScript types.

### Patch Changes

- 2dde4bf: If the target parent directory does not exist, create it.
