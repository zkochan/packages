'use strict'
const fs = require('fs')
const path = require('path')
const tempfile = require('tempfile')
const test = require('tape')
const { EOL } = require('os')
const { writeIniFile, writeIniFileSync } = require('write-ini-file')

test('async', t => {
  const tmp = path.join(tempfile(), 'foo')
  writeIniFile(tmp, { foo: true }, { indent: 2 })
    .then(() => {
      t.equal(fs.readFileSync(tmp, 'utf8'), `foo=true${EOL}`)
      t.end()
    })
    .catch(t.end)
})

test('sync', t => {
  const tmp = path.join(tempfile(), 'foo')
  writeIniFileSync(tmp, { foo: true }, { indent: 2 })
  t.equal(fs.readFileSync(tmp, 'utf8'), `foo=true${EOL}`)
  t.end()
})
