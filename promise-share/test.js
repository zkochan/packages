'use strict';
const test = require('tape')

const pShare = require('.')

test('pShare() success', async (t) => {
  const getValue = pShare(Promise.resolve(1))

  t.equal(await getValue(), 1)
  t.equal(await getValue(), 1)

  t.end()
})

test('pShare() fail', async (t) => {
  t.plan(2)
  const getValue = pShare(Promise.reject(new Error('foo')))

  try {
    t.equal(await getValue(), 1)
  } catch (err) {
    t.equal(err.message, 'foo')
  }
  try {
    t.equal(await getValue(), 1)
  } catch (err) {
    t.equal(err.message, 'foo')
  }
})
