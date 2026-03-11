import path from 'node:path'
import fs from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert'
import tempfile from 'tempfile'
import { writeJson5File, writeJson5FileSync } from './index.js'

test('async', async () => {
  const tmp = path.join(tempfile(), 'foo')
  await writeJson5File(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true,\n}\n')
})

test('sync', () => {
  const tmp = path.join(tempfile(), 'foo')
  writeJson5FileSync(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true,\n}\n')
})
