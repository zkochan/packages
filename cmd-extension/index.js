'use strict'
const path = require('path')

let cmdExtension

if (process.PATHEXT) {
  cmdExtension = process.env.PATHEXT
    .split(path.delimiter)
    .find(ext => ext.toUpperCase() === '.CMD')
}

module.exports = cmdExtension ?? '.cmd'
