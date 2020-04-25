# make-empty-dir

> Ensures that a directory is empty

[![npm version](https://img.shields.io/npm/v/make-empty-dir.svg)](https://www.npmjs.com/package/make-empty-dir)

Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

It works faster than `emptyDir()` of `fs-extra` because the contents of the directory is not read before the creation of the directory.

## Installation

```sh
<npm|yarn|pnpm> add make-empty-dir
```

## Usage

```js
'use strict'
const makeEmptyDir = require('make-empty-dir')

await makeEmptyDir('dir-name')

// or create the parent dir as well
await makeEmptyDir('dir/subdir', { recursive: true })
```

## API

### `makeEmptyDir(dir: string, [opts]): Promise<'created' | 'emptied'>`

**Arguments:**

* `dir` - *Path* - the path of the directory
* `opts.recursive` - *Boolean* - Optional. If true, parent directories will be created.

**Returns:**

A string is returned. `'created'` if there was no directory. `'emptied'` if there was a directory and the its contents were removed.

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
