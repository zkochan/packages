import path from 'node:path'
import writeFileAtomic from 'write-file-atomic'
import fs from 'node:fs'
import ini from 'ini'

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

export async function writeIniFile (fp, data, opts) {
  await fs.promises.mkdir(path.dirname(fp), { recursive: true })
  return main(writeFileAtomic, fp, data, opts)
}

export function writeIniFileSync (fp, data, opts) {
  fs.mkdirSync(path.dirname(fp), { recursive: true })
  main(writeFileAtomic.sync, fp, data, opts)
}
