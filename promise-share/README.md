# promise-share

> Creates a getter function for a promise result

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/promise-share.svg)](https://www.npmjs.com/package/promise-share)
<!--/@-->

Helps to avoid *UnhandledPromiseRejectionWarning*.
If you need to export a result as a promise, use this function to wrap the promise.
When you'll need the result of the promise, run the function.

## Installation

```sh
<pnpm|yarn|npm> add promise-share
```

## Usage

```js
'use strict'
const promiseShare = require('promise-share')

const file = promiseShare(readFileAsync())

console.log(await file())
//> file content
```

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
