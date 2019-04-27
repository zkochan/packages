# can-link

> Returns true if a link can be created

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/can-link.svg)](https://www.npmjs.com/package/can-link)
<!--/@-->

## Installation

```sh
<npm|yarn|pnpm> add can-link
```

## Usage

```js
const canLink = require('can-link')

canLink.sync('C:\\foo.txt', 'D:\\foo.txt')
//> false

canLink.sync('C:\\foo.txt', 'C:\\dir\\foo.txt')
//> true
```

## API

### `canLink.sync(existingPath, newPath): Boolean`

Returns `true` if `fs.linkSync(existingPath, newPath)` is able to create a link.

### `canLink(existingPath, newPath): Promise<Boolean>`

Returns `true` if `fs.link(existingPath, newPath)` is able to create a link.

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
