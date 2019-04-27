# read-json5-file

> Read and parse a JSON5 file

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/read-json5-file.svg)](https://www.npmjs.com/package/read-json5-file)
<!--/@-->

[Strips UTF-8 BOM](https://github.com/sindresorhus/strip-bom) and uses [`graceful-fs`](https://github.com/isaacs/node-graceful-fs).

## Installation

```sh
<npm|yarn|pnpm> add read-json5-file
```

## Usage

```js
'use strict'
const loadJson5File = require('read-json5-file')
const path = require('path')

const fixture = path.join(__dirname, 'countries.json5')
const countries = loadJson5File.sync(fixture)
console.log(countries)
//> [ 'Ukraine', 'Hungary', 'Slovakia' ]
```

## API

### `loadJson5File(filepath)`

Returns a promise for the parsed JSON5.

### `loadJson5File.sync(filepath)`

Returns the parsed JSON5.

## Related

- [write-json5-file](../write-json5-file) - Stringify and write JSON5 to a file atomically
- [load-json-file](https://github.com/sindresorhus/load-json-file) - Read and parse a JSON file
- [json5](https://github.com/json5/json5) - JSON for the ES5 era

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
