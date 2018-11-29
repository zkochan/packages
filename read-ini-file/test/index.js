'use strict'
const path = require('path')
const test = require('tape')
const m = require('read-ini-file')

const fixture = path.join(__dirname, 'fixture.ini')

test('async', t => {
  m(fixture)
    .then(data => {
      t.equal(data.name, 'read-ini-file')
      t.end()
    })
    .catch(t.end)
})

test('sync', t => {
  t.equal(m.sync(fixture).name, 'read-ini-file')
  t.end()
})
