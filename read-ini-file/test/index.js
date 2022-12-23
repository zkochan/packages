'use strict'
const path = require('path')
const test = require('tape')
const { readIniFile, readIniFileSync } = require('read-ini-file')

const fixture = path.join(__dirname, 'fixture.ini')

test('async', t => {
  readIniFile(fixture)
    .then(data => {
      t.equal(data.name, 'read-ini-file')
      t.end()
    })
    .catch(t.end)
})

test('sync', t => {
  t.equal(readIniFileSync(fixture).name, 'read-ini-file')
  t.end()
})
