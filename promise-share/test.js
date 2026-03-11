'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const pShare = require('.')

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
