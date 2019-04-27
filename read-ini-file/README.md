# read-ini-file

> Read and parse an ini file

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/read-ini-file.svg)](https://www.npmjs.com/package/read-ini-file)
<!--/@-->

## Installation

```sh
<npm|yarn|pnpm> add read-ini-file
```

## Usage

<!--@example('./example/index.js')-->
```js
'use strict'
const loadIniFile = require('read-ini-file')
const path = require('path')

const fixture = path.join(__dirname, 'currencies.ini')
const currencies = loadIniFile.sync(fixture)
console.log(currencies)
//> { USA: 'USD', Ukraine: 'UAH', Hungary: 'HUF' }
```
<!--/@-->

## API

### `loadIniFile(filepath)`

Returns a promise for the parsed ini.

### `loadIniFile.sync(filepath)`

Returns the parsed ini.

## Related

- [write-ini-file](https://github.com/zkochan/write-ini-file) - Stringify and write ini to a file atomically
- [ini](https://github.com/npm/ini) - An ini parser/serializer in JavaScript

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
