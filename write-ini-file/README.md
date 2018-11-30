# write-ini-file

> Stringify and write ini to a file atomically

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/write-ini-file.svg)](https://www.npmjs.com/package/write-ini-file)
<!--/@-->

## Installation

```sh
npm i -S write-ini-file
```

## Usage

```js
const writeIniFile = require('write-ini-file')

writeIniFile('foo.ini', {foo: true}).then(() => {
	console.log('done')
})
```

## API

### `writeIniFile(filepath, data, [options])`

Returns a promise.

### `writeIniFile.sync(filepath, data, [options])`

#### options

##### section

Read more at the [ini repo](https://github.com/npm/ini#encodeobject-options).

##### mode

Type: `number`
Default `438` _(0666 in octal)_

[Mode](https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation) used when writing the file.

## Related

- [read-ini-file](https://github.com/zkochan/packages/tree/master/read-ini-file) - Read and parse an ini file
- [ini](https://github.com/npm/ini) - An ini parser/serializer in JavaScript

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
