# dir-is-case-sensitive

> Returns true, if the specified directory is case sensitive

Some filesystems are case sensitive, some are not. Some allow
specific directories to be case sensitive. This package helps
to detect if a directory is case sensitive or not.

## Installation

```
<npm|yarn|pnpm> add dir-is-case-sensitive
```

## Usage

```ts
import dirIsCaseSensitive from 'dir-is-case-sensitive'

await dirIsCaseSensitive('/src')
//>  true
```

## API

### `dirIsCaseSensitive(dirPath, [silent=true]): Promise<boolean|undefined>`

#### Arguments

* dirPath - *Path* - the dir to check
* silent - *Boolean* - Optional. `true` by default. When `false`, an error is thrown if cannot check case sensibility of the file.

#### Returns

* true if dir is case sensible
* false if dir is case sensible
* undefined if could not detect

## License

[MIT](LICENSE) © [Zoltan Kochan](https://www.kochan.io)
