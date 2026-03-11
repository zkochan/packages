'use strict'
const path = require('path')
const { test } = require('node:test')
const assert = require('node:assert')
const { readIniFile, readIniFileSync } = require('read-ini-file')

const fixture = path.join(__dirname, 'fixture.ini')

test('async', async () => {
  const data = await readIniFile(fixture)
  assert.strictEqual(data.name, 'read-ini-file')
})

test('sync', () => {
  assert.strictEqual(readIniFileSync(fixture).name, 'read-ini-file')
})
