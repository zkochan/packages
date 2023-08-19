'use strict'
const fs = require('fs')
const test = require('tape')
const tempy = require('tempy')
const path = require('path')
const makeEmptyDir = require('.')

test('creates a new directory if it does not exist', async t => {
  const dir = path.join(tempy.directory(), 'empty')
  t.equal(await makeEmptyDir(dir), 'created')
  t.ok(fs.existsSync(dir))
  t.end()
})

test('creates a new directory and its parent directory, when recursive is set to true', async t => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  t.equal(await makeEmptyDir(dir, { recursive: true }), 'created')
  t.ok(fs.existsSync(dir))
  t.end()
})

test('fails if the parent directory does not exist and recursive is not set', async t => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  let err
  try {
    await makeEmptyDir(dir)
  } catch (_err) {
    err = _err
  }
  t.ok(err)
  t.end()
})

test('removes everything from an existing directory', async t => {
  const dir = path.join(tempy.directory(), 'empty')
  fs.mkdirSync(path.join(dir))
  const filePath = path.join(dir, 'file')
  fs.writeFileSync(filePath, '', 'utf8')
  t.equal(await makeEmptyDir(dir), 'emptied')
  t.ok(fs.existsSync(dir))
  t.notOk(fs.existsSync(filePath))
  t.end()
})

test('sync: creates a new directory if it does not exist', t => {
  const dir = path.join(tempy.directory(), 'empty')
  t.equal(makeEmptyDir.sync(dir), 'created')
  t.ok(fs.existsSync(dir))
  t.end()
})

test('sync: creates a new directory and its parent directory, when recursive is set to true', t => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  t.equal(makeEmptyDir.sync(dir, { recursive: true }), 'created')
  t.ok(fs.existsSync(dir))
  t.end()
})

test('sync: fails if the parent directory does not exist and recursive is not set', t => {
  const dir = path.join(tempy.directory(), 'empty/empty')
  let err
  try {
    makeEmptyDir.sync(dir)
  } catch (_err) {
    err = _err
  }
  t.ok(err)
  t.end()
})

test('sync: removes everything from an existing directory', t => {
  const dir = path.join(tempy.directory(), 'empty')
  fs.mkdirSync(path.join(dir))
  const filePath = path.join(dir, 'file')
  fs.writeFileSync(filePath, '', 'utf8')
  t.equal(makeEmptyDir.sync(dir), 'emptied')
  t.ok(fs.existsSync(dir))
  t.notOk(fs.existsSync(filePath))
  t.end()
})
