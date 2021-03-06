'use strict'
const path = require('path')
const writeFileAtomic = require('write-file-atomic')
const makeDir = require('make-dir')
const ini = require('ini')

const main = (fn, fp, data, opts) => {
  if (!fp) {
    throw new TypeError('Expected a filepath')
  }

  if (data === undefined) {
    throw new TypeError('Expected data to stringify')
  }

  opts = opts || {}

  const encodedData = ini.encode(data, opts)

  return fn(fp, encodedData, { mode: opts.mode })
}

module.exports = (fp, data, opts) =>
  makeDir(path.dirname(fp))
    .then(() => main(writeFileAtomic, fp, data, opts))

module.exports.sync = (fp, data, opts) => {
  makeDir.sync(path.dirname(fp))
  main(writeFileAtomic.sync, fp, data, opts)
}
