import fs from 'node:fs'
import path from 'node:path'
import tempfile from 'tempfile'
import { test } from 'node:test'
import assert from 'node:assert'
import { EOL } from 'node:os'
import { writeIniFile, writeIniFileSync } from 'write-ini-file'

test('async', async () => {
  const tmp = path.join(tempfile(), 'foo')
  await writeIniFile(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), `foo=true${EOL}`)
})

test('sync', () => {
  const tmp = path.join(tempfile(), 'foo')
  writeIniFileSync(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), `foo=true${EOL}`)
})
