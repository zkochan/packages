# render-help

> Creates a nice output for a CLI --help

[![npm version](https://img.shields.io/npm/v/render-help.svg)](https://www.npmjs.com/package/render-help)

## Installation

```
<pnpm|yarn|npm> add render-help
```

## Usage

```JavaScript
const renderHelp = require('./lib')

const output = renderHelp({
  usages: ['pnpm install [options]'],
  aliases: ['i'],
  description: 'Install all dependencies',
  descriptionLists: [
    {
      title: 'Options',
      list: [
        {
          name: '--force',
          shortAlias: '-f',
          description: 'Do some dangerous things'
        },
        {
          name: '--lockfile-only',
          description: "Don't create node_modules. Just generate pnpm-lock.yaml"
        }
      ]
    }
  ],
  url: 'https://pnpm.js.org/en/cli/install'
})
console.log(output)
// Usage: pnpm install [options]
//
// Alias: i
//
// Install all dependencies
//
// Options:
//   -f, --force               Do some dangerous things
//       --lockfile-only       Don't create node_modules. Just generate pnpm-lock.yaml
//
// Visit https://pnpm.js.org/en/cli/install for documentation about this command.
```

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
