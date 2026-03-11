import path from 'node:path'
import fs from 'node:fs'
import writeFileAtomic from 'write-file-atomic'
import YAML from 'js-yaml'

const main = (fn, fp, data, opts) => {
  if (!fp) {
    throw new TypeError('Expected a filepath')
  }

  if (data === undefined) {
    throw new TypeError('Expected data to stringify')
  }

  opts = opts || {}

  const yaml = YAML.dump(data, opts)

  return fn(fp, yaml, { mode: opts.mode })
}

export async function writeYamlFile (fp, data, opts) {
  if (opts?.makeDir ?? true) {
    await fs.promises.mkdir(path.dirname(fp), { recursive: true })
  }
  return main(writeFileAtomic, fp, data, opts)
}

export function writeYamlFileSync (fp, data, opts) {
  if (opts?.makeDir ?? true) {
    fs.mkdirSync(path.dirname(fp), { recursive: true })
  }
  main(writeFileAtomic.sync, fp, data, opts)
}
