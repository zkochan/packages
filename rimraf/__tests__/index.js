const path = require('path')
const fs = require('fs')
const { test } = require('node:test')
const assert = require('node:assert')
const tempy = require('tempy')
const rimraf = require('..')

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
  rimraf.sync(dir)
  assert.ok(!fs.existsSync(dir))
})
