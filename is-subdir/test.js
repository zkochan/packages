'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const path = require('path')
const isSubdir = require('.')
const isWindows = require('is-windows')()

test('isSubdir()', () => {
  assert.ok(isSubdir(process.cwd(), path.resolve('node_modules')))
  assert.ok(!isSubdir(process.cwd(), path.resolve('..')))
  assert.ok(isSubdir(process.cwd(), process.cwd()))

  assert.ok(isSubdir('node_modules', path.resolve('node_modules', 'tape')))
  assert.ok(!isSubdir(path.resolve('node_modules', 'foo'), path.resolve('node_modules', 'foo-bar')))

  if (isWindows) {
    assert.ok(isSubdir('C:', 'C:\\.pnpm-store'))
  }
})

test('isSubdir.strict()', () => {
  assert.ok(!isSubdir.strict(process.cwd(), process.cwd()))
  assert.ok(!isSubdir.strict('node_modules/tape', '../tape'))
  assert.ok(isSubdir.strict('node_modules', path.resolve('node_modules', 'tape')))
})
