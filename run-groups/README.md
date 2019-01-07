# run-groups

> Runs a sequence of concurrent task groups

## Installation

```
pnpm i run-groups
```

## Usage

```ts
import runGroups from 'run-groups'

await runGroups(10, [
  [
    async () => {},
    async () => {},
  ],
  [
    async () => {},
    async () => {},
    async () => {},
  ],
  [
    async () => {},
  ],
])
```

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
