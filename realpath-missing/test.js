'use strict'
const test = require('tape')
const realpathMissing = require('.')

test('realpathMissing()', async t => {
  t.equal(typeof await realpathMissing('package.json'), 'string')
  t.equal(typeof await realpathMissing('missing-file'), 'string')

  t.end()
})
