'use strict'
const path = require('path')
const test = require('tape')
const m = require('..')

const fixture = path.join(__dirname, 'fixture.json5')

test('async', t => {
  m(fixture)
    .then(data => {
      t.equal(data.name, 'load-json5-file')
      t.end()
    })
    .catch(t.end)
})

test('sync', t => {
  t.equal(m.sync(fixture).name, 'load-json5-file')
  t.end()
})
