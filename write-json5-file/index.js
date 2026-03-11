import path from 'node:path'
import fs from 'node:fs'
import writeFileAtomic from 'write-file-atomic'
import sortKeys from 'sort-keys'
import JSON5 from 'json5'

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

export async function writeJson5File (fp, data, opts) {
  await fs.promises.mkdir(path.dirname(fp), { recursive: true })
  return main(writeFileAtomic, fp, data, opts)
}

export function writeJson5FileSync (fp, data, opts) {
  fs.mkdirSync(path.dirname(fp), { recursive: true })
  main(writeFileAtomic.sync, fp, data, opts)
}
