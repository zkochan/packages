'use strict'
const path = require('path')
const fs = require('graceful-fs')
const writeFileAtomic = require('write-file-atomic')
const mkdirp = require('mkdirp')
const pify = require('pify')
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
  pify(mkdirp)(path.dirname(fp), { fs })
    .then(() => main(pify(writeFileAtomic), fp, data, opts))

module.exports.sync = (fp, data, opts) => {
  mkdirp.sync(path.dirname(fp), { fs })
  main(writeFileAtomic.sync, fp, data, opts)
}
