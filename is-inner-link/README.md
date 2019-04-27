# is-inner-link

> Returns true if a link targets a directory inside its parent directory

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/is-inner-link.svg)](https://www.npmjs.com/package/is-inner-link)
<!--/@-->

## Installation

```sh
<npm|yarn|pnpm> add is-inner-link
```

## Usage

```js
'use strict'
const isInnerLink = require('is-inner-link')

isInnerLink('node_modules', 'foo')
  .then(link => console.log(link))
  .catch(err => console.error(err))
//> {isInner: false, target: '/zkochan/foo'}
```

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
