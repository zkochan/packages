# preferred-pm

> Returns the preferred package manager of a project

[![npm version](https://img.shields.io/npm/v/preferred-pm.svg)](https://www.npmjs.com/package/preferred-pm)

## Installation

```
npm i preferred-pm
```

## Usage

```js
'use strict'
const preferredPM = require('preferred-pm')

preferredPM(process.cwd())
    .then(pm => console.log(pm))
//> {name: "npm", version: ">=5"}
```

## Related

* [which-pm](https://github.com/zkochan/packages/tree/master/which-pm) - Detects what package manager was used for installation
* [which-pm-runs](https://github.com/zkochan/packages/tree/master/which-pm-runs) - Detects what package manager executes the process

## License

[MIT](LICENSE) © [Zoltan Kochan](https://kochan.io)
