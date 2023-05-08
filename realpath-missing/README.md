# realpath-missing

> `realpath-missing` resolves the absolute path of a file or directory by following every symbolic link in every component of the given name recursively, even if some of the components do not exist.

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/realpath-missing.svg)](https://www.npmjs.com/package/realpath-missing)
<!--/@-->

## Installation

```sh
<npm|yarn|pnpm> add realpath-missing
```

## Usage

```js
'use strict'
const realpathMissing = require('realpath-missing')

console.log(await realpathMissing('package.json'))
//> /home/src/package.json
```

## API

### `realpathMissing(path): Promise<path>`

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
