'use strict'
const pathTemp = require('path-temp')
const test = require('tape')

test('pathTemp', t => {
  t.equal(typeof pathTemp(process.cwd()), 'string')
  t.end()
})
