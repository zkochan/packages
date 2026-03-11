'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const readYamlFile = require('read-yaml-file')

test('readYamlFile()', async () => {
  const data = await readYamlFile('foo.yml')
  assert.deepStrictEqual(data, { foo: true })
})

test('readYamlFile.sync()', () => {
  const data = readYamlFile.sync('foo.yml')
  assert.deepStrictEqual(data, { foo: true })
})
