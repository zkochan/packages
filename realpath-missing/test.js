'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const realpathMissing = require('.')

test('realpathMissing()', async () => {
  assert.strictEqual(typeof await realpathMissing('package.json'), 'string')
  assert.strictEqual(typeof await realpathMissing('missing-file'), 'string')
})
