import { test } from 'node:test'
import assert from 'node:assert'
import { betterPathResolve } from './index.js'

test('betterPathResolve()', () => {
  assert.strictEqual(typeof betterPathResolve(), 'string')
})
