'use strict'
const fs = require('fs')
const path = require('path')
const tempfile = require('tempfile')
const { test } = require('node:test')
const assert = require('node:assert')
const { EOL } = require('os')
const { writeIniFile, writeIniFileSync } = require('write-ini-file')

test('async', async () => {
  const tmp = path.join(tempfile(), 'foo')
  await writeIniFile(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), `foo=true${EOL}`)
})

test('sync', () => {
  const tmp = path.join(tempfile(), 'foo')
  writeIniFileSync(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), `foo=true${EOL}`)
})
