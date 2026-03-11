import path from 'node:path'
import fs from 'node:fs'
import stripBom from 'strip-bom'
import JSON5 from 'json5'

const parse = (data, fp) => JSON5.parse(stripBom(data), path.relative('.', fp))

export async function readJson5File (fp) {
  const data = await fs.promises.readFile(fp, 'utf8')
  return parse(data, fp)
}

export function readJson5FileSync (fp) {
  return parse(fs.readFileSync(fp, 'utf8'), fp)
}
