# p-map-values

> A function similar to lodash.mapValues or Ramda.mapObjIndexed, but for async functions

## Installation

```
pnpm add p-map-values
```

## Usage

```ts
import pMapValues from 'p-map-values'

const users = {
  fred: { id: 1 },
  pebbles: { id: 2 },
}

pMapValues(async (user) => await fetchUserFromDB(user.id), users)
// => { fred: { age: 40 }, pebbles: { age: 1 } }
```

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
