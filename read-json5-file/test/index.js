import path from 'node:path'
import { test } from 'node:test'
import assert from 'node:assert'
import { fileURLToPath } from 'node:url'
import { readJson5File, readJson5FileSync } from '../index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixture = path.join(__dirname, 'fixture.json5')

test('async', async () => {
  const data = await readJson5File(fixture)
  assert.strictEqual(data.name, 'load-json5-file')
})

test('sync', () => {
  assert.strictEqual(readJson5FileSync(fixture).name, 'load-json5-file')
})
