import { readJson5FileSync } from 'read-json5-file'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixture = path.join(__dirname, 'countries.json5')
const countries = readJson5FileSync(fixture)
console.log(countries)
