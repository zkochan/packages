# graceful-git

> Executes Git commands gracefully. Retries on errors

Git is called by absolute path to avoid binary planting attacks on Windows.

<!--@shields('npm')-->
[![npm version](https://img.shields.io/npm/v/graceful-git.svg)](https://www.npmjs.com/package/graceful-git)
<!--/@-->

## Installation

```sh
<npm|yarn|pnpm> add graceful-git
```

## Usage

<!--@example('./example.js')-->
```js
'use strict'
const gracefulGit = require('graceful-git')

gracefulGit(['status', 'README.md'])
  .then(result => console.log(result.stdout))
  .catch(err => console.error(err))
  //> On branch master
  //  Your branch is based on 'origin/master', but the upstream is gone.
  //    (use "git branch --unset-upstream" to fixup)
  //  nothing to commit, working directory clean
```
<!--/@-->

## API

### `git(args, [opts]) => Promise`

**Arguments:**

- `args` - _string\[]_ - arguments passed to the Git CLI
- `opts.cwd` - _Path_ - the directory in which the Git command should be executed
- `...opts` - _object_ - optional. Parameters used by [retry](https://www.npmjs.com/package/retry) when git operation fails.

### `git.noRetry(args, [opts]) => Promise`

Same as `git()` but without retries.

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io)
