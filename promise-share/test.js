import { test } from 'node:test'
import assert from 'node:assert'
import { pShare } from './index.js'

test('pShare() success', async () => {
  const getValue = pShare(Promise.resolve(1))

  assert.strictEqual(await getValue(), 1)
  assert.strictEqual(await getValue(), 1)
})

test('pShare() fail', async () => {
  const getValue = pShare(Promise.reject(new Error('foo')))

  await assert.rejects(getValue(), { message: 'foo' })
  await assert.rejects(getValue(), { message: 'foo' })
})
