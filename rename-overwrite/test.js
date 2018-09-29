'use strict'
const test = require('tape')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')
const renameOverwrite = require('rename-overwrite')
const tempy = require('tempy')

test('overwrite directory', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1/foo.json', 1)
  writeJsonFile.sync('2/foo.json', 2)

  renameOverwrite('1', '2')
    .then(() => {
      t.equal(loadJsonFile.sync('2/foo.json'), 1)
      t.end()
    })
    .catch(t.end)
})

test('overwrite file', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)
  writeJsonFile.sync('2.json', 2)

  renameOverwrite('1.json', '2.json')
    .then(() => {
      t.equal(loadJsonFile.sync('2.json'), 1)
      t.end()
    })
    .catch(t.end)
})

test('rename file when no overwrite is needed', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)

  renameOverwrite('1.json', '2.json')
    .then(() => {
      t.equal(loadJsonFile.sync('2.json'), 1)
      t.end()
    })
    .catch(t.end)
})

test('rename directory when no overwrite is needed', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite('dir', 'newdir')
    .then(() => {
      t.equal(loadJsonFile.sync('newdir/foo.json'), 1)
      t.end()
    })
    .catch(t.end)
})

test('sync overwrite directory', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1/foo.json', 1)
  writeJsonFile.sync('2/foo.json', 2)

  renameOverwrite.sync('1', '2')

  t.equal(loadJsonFile.sync('2/foo.json'), 1)
  t.end()
})

test('sync overwrite file', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)
  writeJsonFile.sync('2.json', 2)

  renameOverwrite.sync('1.json', '2.json')

  t.equal(loadJsonFile.sync('2.json'), 1)
  t.end()
})

test('sync rename file when no overwrite is needed', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)

  renameOverwrite.sync('1.json', '2.json')

  t.equal(loadJsonFile.sync('2.json'), 1)
  t.end()
})

test('sync rename directory when no overwrite is needed', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite.sync('dir', 'newdir')

  t.equal(loadJsonFile.sync('newdir/foo.json'), 1)
  t.end()
})
