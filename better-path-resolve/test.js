'use strict'
const test = require('tape')
const betterPathResolve = require('.')

test('betterPathResolve()', (t) => {
  t.equal(typeof betterPathResolve(), 'string')
  t.end()
})
