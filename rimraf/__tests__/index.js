import path from 'node:path'
import fs from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert'
import tempy from 'tempy'
import { rimraf, rimrafSync } from '@zkochan/rimraf'

test('rimraf', async () => {
  const dir = tempy.directory()
  fs.writeFileSync(path.join(dir, 'file.txt'), 'foo', 'utf8')
  assert.ok(fs.existsSync(dir))
  await rimraf(dir)
  assert.ok(!fs.existsSync(dir))
})

test('rimraf sync', () => {
  const dir = tempy.directory()
  fs.writeFileSync(path.join(dir, 'file.txt'), 'foo', 'utf8')
  assert.ok(fs.existsSync(dir))
  rimrafSync(dir)
  assert.ok(!fs.existsSync(dir))
})
