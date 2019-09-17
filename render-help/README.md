# render-help

> Creates a nice output for a CLI --help

## Installation

```
<pnpm|yarn|npm> add render-help
```

## Usage

```ts
import renderHelp from 'render-help'

const output = renderHelp({
  usages: ['pnpm install [options]'],
  aliases: ['i'],
  description: 'Install all dependencies',
  descriptionLists: [
    {
      title: 'Options',
      list: [
        {
          name: '-force',
          shortAlias: '-f',
          description: 'Do some dangerous things'
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
//   -f, -force               Do some dangerous things
//
// Visit https://pnpm.js.org/en/cli/install for documentation about this command.
```

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
