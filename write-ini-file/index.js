'use strict'
const path = require('path')
const writeFileAtomic = require('write-file-atomic')
const fs = require('fs')
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

module.exports.writeIniFile = async (fp, data, opts) => {
  await fs.promises.mkdir(path.dirname(fp), { recursive: true })
  return main(writeFileAtomic, fp, data, opts)
}

module.exports.writeIniFileSync = (fp, data, opts) => {
  fs.mkdirSync(path.dirname(fp), { recursive: true })
  main(writeFileAtomic.sync, fp, data, opts)
}
