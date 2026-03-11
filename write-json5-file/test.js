'use strict'
const path = require('path')
const fs = require('fs')
const { test } = require('node:test')
const assert = require('node:assert')
const tempfile = require('tempfile')
const writeJson5File = require('.')

test('async', async () => {
  const tmp = path.join(tempfile(), 'foo')
  await writeJson5File(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true,\n}\n')
})

test('sync', () => {
  const tmp = path.join(tempfile(), 'foo')
  writeJson5File.sync(tmp, { foo: true }, { indent: 2 })
  assert.strictEqual(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true,\n}\n')
})
