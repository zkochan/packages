'use strict'
const test = require('tape')
const path = require('path')
const isSubdir = require('.')
const isWindows = require('is-windows')()

test('isSubdir()', t => {
  t.ok(isSubdir(process.cwd(), path.resolve('node_modules')))
  t.ok(!isSubdir(process.cwd(), path.resolve('..')))
  t.ok(isSubdir(process.cwd(), process.cwd()))

  t.ok(isSubdir('node_modules', path.resolve('node_modules', 'tape')))
  t.notOk(isSubdir(path.resolve('node_modules', 'foo'), path.resolve('node_modules', 'foo-bar')))

  if (isWindows) {
    t.ok(isSubdir('C:', 'C:\\.pnpm-store'))
  }

  t.end()
})

test('isSubdir.strict()', t => {
  t.notOk(isSubdir.strict(process.cwd(), process.cwd()))
  t.notOk(isSubdir.strict('node_modules/tape', '../tape'))
  t.ok(isSubdir.strict('node_modules', path.resolve('node_modules', 'tape')))

  t.end()
})
