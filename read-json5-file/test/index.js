'use strict'
const path = require('path')
const { test } = require('node:test')
const assert = require('node:assert')
const readJson5File = require('..')

const fixture = path.join(__dirname, 'fixture.json5')

test('async', async () => {
  const data = await readJson5File(fixture)
  assert.strictEqual(data.name, 'load-json5-file')
})

test('sync', () => {
  assert.strictEqual(readJson5File.sync(fixture).name, 'load-json5-file')
})
