# resolve-link-target

> Resolve a symlink's (or junction's) target

[![npm version](https://img.shields.io/npm/v/resolve-link-target.svg)](https://www.npmjs.com/package/resolve-link-target)

## Installation

```
npm install resolve-link-target
```

## Usage

```js
const resolveLinkTarget = require('resolve-link-target')

resolveLinkTarget('path-to-symlink').then(targetPath => console.log(targetPath))
//> "/home/target"

resolveLinkTarget.sync('path-to-symlink')
//> "/home/target"
```

## API

### `resolveLinkTarget(linkPath)`

Returns a `Promise`.

### `resolveLinkTarget.sync(linkPath)`

#### linkPath

Type: `string`

Path to the symlink or junction that should be resolved.

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
