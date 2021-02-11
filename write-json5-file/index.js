'use strict'
const path = require('path')
const fs = require('fs')
const writeFileAtomic = require('write-file-atomic')
const sortKeys = require('sort-keys')
const JSON5 = require('json5')

const main = (fn, fp, data, opts) => {
  if (!fp) {
    throw new TypeError('Expected a filepath')
  }

  if (data === undefined) {
    throw new TypeError('Expected data to stringify')
  }

  opts = Object.assign({
    indent: '\t',
    sortKeys: false
  }, opts)

  if (opts.sortKeys) {
    data = sortKeys(data, {
      deep: true,
      compare: typeof opts.sortKeys === 'function' && opts.sortKeys
    })
  }

  const json = JSON5.stringify(data, opts.replacer, opts.indent)

  return fn(fp, `${json}\n`, { mode: opts.mode })
}

module.exports = async (fp, data, opts) => {
  await fs.promises.mkdir(path.dirname(fp), { recursive: true })
  return main(writeFileAtomic, fp, data, opts)
}

module.exports.sync = (fp, data, opts) => {
  fs.mkdirSync(path.dirname(fp), { recursive: true })
  main(writeFileAtomic.sync, fp, data, opts)
}
