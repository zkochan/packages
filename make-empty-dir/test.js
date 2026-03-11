'use strict'
const fs = require('fs')
const { test } = require('node:test')
const assert = require('node:assert')
const tempy = require('tempy')
const path = require('path')
const makeEmptyDir = require('.')

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
  assert.strictEqual(makeEmptyDir.sync(dir), 'created')
  assert.ok(fs.existsSync(dir))
})

test('sync: creates a new directory and its parent directory, when recursive is set to true', () => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  assert.strictEqual(makeEmptyDir.sync(dir, { recursive: true }), 'created')
  assert.ok(fs.existsSync(dir))
})

test('sync: fails if the parent directory does not exist and recursive is not set', () => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  assert.throws(() => makeEmptyDir.sync(dir))
})

test('sync: removes everything from an existing directory', () => {
  const dir = path.join(tempy.directory(), 'empty')
  fs.mkdirSync(path.join(dir))
  const filePath = path.join(dir, 'file')
  fs.writeFileSync(filePath, '', 'utf8')
  assert.strictEqual(makeEmptyDir.sync(dir), 'emptied')
  assert.ok(fs.existsSync(dir))
  assert.ok(!fs.existsSync(filePath))
})
