import { test } from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import { isSubdir, strict } from './index.js'
import isWindows from 'is-windows'

const _isWindows = isWindows()

test('isSubdir()', () => {
  assert.ok(isSubdir(process.cwd(), path.resolve('node_modules')))
  assert.ok(!isSubdir(process.cwd(), path.resolve('..')))
  assert.ok(isSubdir(process.cwd(), process.cwd()))

  assert.ok(isSubdir('node_modules', path.resolve('node_modules', 'tape')))
  assert.ok(!isSubdir(path.resolve('node_modules', 'foo'), path.resolve('node_modules', 'foo-bar')))

  if (_isWindows) {
    assert.ok(isSubdir('C:', 'C:\\.pnpm-store'))
  }
})

test('isSubdir.strict()', () => {
  assert.ok(!strict(process.cwd(), process.cwd()))
  assert.ok(!strict('node_modules/tape', '../tape'))
  assert.ok(strict('node_modules', path.resolve('node_modules', 'tape')))
})
