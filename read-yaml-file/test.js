'use strict'
const test = require('tape')
const readYamlFile = require('read-yaml-file')

test('readYamlFile()', (t) => {
  return readYamlFile('foo.yml').then(data => {
    t.deepEqual(data, { foo: true })
    t.end()
  })
})

test('readYamlFile.sync()', (t) => {
  const data = readYamlFile.sync('foo.yml')
  t.deepEqual(data, { foo: true })
  t.end()
})
