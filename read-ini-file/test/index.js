import path from 'node:path'
import { test } from 'node:test'
import assert from 'node:assert'
import { fileURLToPath } from 'node:url'
import { readIniFile, readIniFileSync } from 'read-ini-file'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixture = path.join(__dirname, 'fixture.ini')

test('async', async () => {
  const data = await readIniFile(fixture)
  assert.strictEqual(data.name, 'read-ini-file')
})

test('sync', () => {
  assert.strictEqual(readIniFileSync(fixture).name, 'read-ini-file')
})
