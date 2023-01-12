# read-ini-file

## 4.0.0

### Breaking Changes

- Node.js 14 is required

## 3.1.0

### Minor Changes

- bba9985: graceful-fs and mz removed from dependencies.
- Breaking Change: `readIniFile.sync` changes to `readIniFileSync`
- Breaking Change: `import readIniFile` changes to `import { readIniFile, readIniFileSync }` (where you choose what you use)

## 3.0.1

### Patch Changes

- 68010ea: Use util.promisify instead of the pify library.
- 01c2324: Update ini to version 2.
