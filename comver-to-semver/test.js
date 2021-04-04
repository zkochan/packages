'use strict'
const test = require('tape')
const comverToSemver = require('.')

test('canWriteToDir.sync()', t => {
  t.equal(comverToSemver('2'), '2.0.0')
  t.equal(comverToSemver('2.1'), '2.1.0')
  t.end()
})
