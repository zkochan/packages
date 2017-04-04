# which-pm

> Detects what package manager was used for installation

[![npm version](https://img.shields.io/npm/v/which-pm.svg)](https://www.npmjs.com/package/which-pm) [![Build Status](https://img.shields.io/travis/zkochan/which-pm/master.svg)](https://travis-ci.org/zkochan/which-pm)

## Installation

```
npm i which-pm
```

## Usage

```js
'use strict'
const whichpm = require('which-pm')

whichpm(process.cwd())
    .then(pm => console.log(pm))
    .catch(err => console.error(err))
//> "pnpm"
```

## License

[MIT](LICENSE) © [Zoltan Kochan](http://kochan.io)
