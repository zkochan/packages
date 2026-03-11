'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const rootLinkTarget = require('root-link-target')

test('rootLinkTarget.sync()', () => {
  assert.strictEqual(typeof rootLinkTarget.sync('package.json'), 'string')
})

test('rootLinkTarget()', async () => {
  const root = await rootLinkTarget('package.json')
  assert.strictEqual(typeof root, 'string')
})
