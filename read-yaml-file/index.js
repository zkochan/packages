import fs from 'node:fs'
import stripBom from 'strip-bom'
import yaml from 'js-yaml'

const parse = data => yaml.load(stripBom(data))

export async function readYamlFile (fp) {
  const data = await fs.promises.readFile(fp, 'utf8')
  return parse(data)
}

export function readYamlFileSync (fp) {
  return parse(fs.readFileSync(fp, 'utf8'))
}
