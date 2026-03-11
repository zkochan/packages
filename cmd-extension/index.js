import path from 'node:path'

let _cmdExtension

if (process.env.PATHEXT) {
  _cmdExtension = process.env.PATHEXT
    .split(path.delimiter)
    .find(ext => ext.toUpperCase() === '.CMD')
}

export const cmdExtension = _cmdExtension || '.cmd'
