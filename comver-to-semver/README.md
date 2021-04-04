# comver-to-semver

> Converts a comver (compatible version) to a semver (semantic version).

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/comver-to-semver.svg)](https://www.npmjs.com/package/comver-to-semver)
<!--/@-->

## Installation

```sh
<npm|yarn|pnpm> add comver-to-semver
```

## Usage

```js
const comverToSemver = require('comver-to-semver')

comverToSemver('2.1')
//> '2.1.0'

comverToSemver('2')
//> '2.0.0'
```

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
