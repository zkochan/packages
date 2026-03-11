import { test } from 'node:test'
import assert from 'node:assert'
import { comverToSemver } from './index.js'

test('comverToSemver()', () => {
  assert.strictEqual(comverToSemver('2'), '2.0.0')
  assert.strictEqual(comverToSemver('2.1'), '2.1.0')
})
