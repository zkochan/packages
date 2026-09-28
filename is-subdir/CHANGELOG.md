# is-subdir

## 2.0.1

### Patch Changes

- 6abba3f: `isSubdir()` and `strict()` now match subdirectories of a filesystem root, such as `/` or `C:\`. Previously, they returned `false` for every path when the parent directory was a filesystem root.

## 2.0.0

### Major Changes

- f3776b0: convert to esm

### Patch Changes

- Updated dependencies [f3776b0]
  - better-path-resolve@2.0.0
