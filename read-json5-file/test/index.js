'use strict'
const path = require('path')
const test = require('tape')
const readJson5File = require('..')

const fixture = path.join(__dirname, 'fixture.json5')

test('async', async t => {
  const data = await readJson5File(fixture)
  t.equal(data.name, 'load-json5-file')
  t.end()
})

test('sync', t => {
  t.equal(readJson5File.sync(fixture).name, 'load-json5-file')
  t.end()
})
