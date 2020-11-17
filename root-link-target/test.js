'use strict'
const rootLinkTarget = require('root-link-target')
const test = require('tape')

test('rootLinkTarget.sync()', t => {
  t.equal(typeof rootLinkTarget.sync('package.json'), 'string')
  t.end()
})

test('rootLinkTarget.sync()', async t => {
  const root = await rootLinkTarget('package.json')
  t.equal(typeof root, 'string')
  t.end()
})
