# write-json5-file

> Stringify and write JSON to a file atomically

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/write-json5-file.svg)](https://www.npmjs.com/package/write-json5-file)
<!--/@-->

## Installation

```sh
npm i -S write-json5-file
```

## Usage

```js
const writeJson5File = require('write-json5-file')

writeJson5File('foo.json5', {foo: true}).then(() => {
	console.log('done')
})
```

## API

### `writeJson5File(filepath, data, [options])`

Returns a promise.

### `writeJson5File.sync(filepath, data, [options])`

#### options

##### indent

Type: `string`, `number`
Default: `\t`

Indentation as a string or number of spaces.
Pass in `null` for no formatting.

##### sortKeys

Type: `boolean`, `function`
Default: `false`

Sort the keys recursively.
Optionally pass in a [`compare`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function.

##### replacer

Type: `function`

Passed into [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter).

##### mode

Type: `number`
Default `438` _(0666 in octal)_

[Mode](https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation) used when writing the file.

## Related

- [load-json5-file](https://github.com/zkochan/load-json5-file) - Read and parse a JSON5 file
- [write-json-file](https://github.com/sindresorhus/write-json-file) - Stringify and write JSON to a file atomically
- [json5](https://github.com/json5/json5) - JSON for the ES5 era

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
