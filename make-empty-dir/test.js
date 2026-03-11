import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import assert from 'node:assert'
import tempy from 'tempy'
import { makeEmptyDir, makeEmptyDirSync } from './index.js'

test('creates a new directory if it does not exist', async () => {
  const dir = path.join(tempy.directory(), 'empty')
  assert.strictEqual(await makeEmptyDir(dir), 'created')
  assert.ok(fs.existsSync(dir))
})

test('creates a new directory and its parent directory, when recursive is set to true', async () => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  assert.strictEqual(await makeEmptyDir(dir, { recursive: true }), 'created')
  assert.ok(fs.existsSync(dir))
})

test('fails if the parent directory does not exist and recursive is not set', async () => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  await assert.rejects(makeEmptyDir(dir))
})

test('removes everything from an existing directory', async () => {
  const dir = path.join(tempy.directory(), 'empty')
  fs.mkdirSync(path.join(dir))
  const filePath = path.join(dir, 'file')
  fs.writeFileSync(filePath, '', 'utf8')
  assert.strictEqual(await makeEmptyDir(dir), 'emptied')
  assert.ok(fs.existsSync(dir))
  assert.ok(!fs.existsSync(filePath))
})

test('sync: creates a new directory if it does not exist', () => {
  const dir = path.join(tempy.directory(), 'empty')
  assert.strictEqual(makeEmptyDirSync(dir), 'created')
  assert.ok(fs.existsSync(dir))
})

test('sync: creates a new directory and its parent directory, when recursive is set to true', () => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  assert.strictEqual(makeEmptyDirSync(dir, { recursive: true }), 'created')
  assert.ok(fs.existsSync(dir))
})

test('sync: fails if the parent directory does not exist and recursive is not set', () => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  assert.throws(() => makeEmptyDirSync(dir))
})

test('sync: removes everything from an existing directory', () => {
  const dir = path.join(tempy.directory(), 'empty')
  fs.mkdirSync(path.join(dir))
  const filePath = path.join(dir, 'file')
  fs.writeFileSync(filePath, '', 'utf8')
  assert.strictEqual(makeEmptyDirSync(dir), 'emptied')
  assert.ok(fs.existsSync(dir))
  assert.ok(!fs.existsSync(filePath))
})
