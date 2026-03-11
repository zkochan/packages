import { readIniFileSync } from 'read-ini-file'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixture = path.join(__dirname, 'currencies.ini')
const currencies = readIniFileSync(fixture)
console.log(currencies)
