import fs from 'node:fs'
import stripBom from 'strip-bom'
import ini from 'ini'

const parse = (data) => ini.parse(stripBom(data))

export async function readIniFile (fp) {
  const data = await fs.promises.readFile(fp, 'utf8')
  return parse(data)
}

export function readIniFileSync (fp) {
  return parse(fs.readFileSync(fp, 'utf8'))
}
