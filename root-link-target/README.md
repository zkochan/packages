# root-link-target

> Gets the shortest directory to which a file can be linked

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/root-link-target.svg)](https://www.npmjs.com/package/root-link-target)
<!--/@-->

## Installation

```sh
<npm|yarn|pnpm> add root-link-target
```

## Usage

```js
const rootLinkTarget = require('root-link-target')

rootLinkTarget.sync('C:\\sub\\dir\\foo.txt')
//> C:\\
```

## API

### `rootLinkTarget.sync(filename): string`

Returns the shortest directory to which `filename` can be linked

### `rootLinkTarget(filename): Promise<string>`

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
