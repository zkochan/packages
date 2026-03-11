'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const getLinkTarget = require('.')
const symlinkDir = require('symlink-dir').default
const path = require('path')

test('getLinkTarget()', async () => {
  await symlinkDir('node_modules', 'node_modules_link')
  const target = await getLinkTarget('node_modules_link')
  assert.strictEqual(target, path.resolve('node_modules'))
})

test('getLinkTarget.sync()', async () => {
  await symlinkDir('node_modules', 'node_modules_link')
  assert.strictEqual(getLinkTarget.sync('node_modules_link'), path.resolve('node_modules'))
})
