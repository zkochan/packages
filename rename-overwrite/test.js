'use strict'
const fs = require('fs')
const path = require('path')
const test = require('tape')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')
const renameOverwrite = require('rename-overwrite')
const symlinkDir = require('symlink-dir')
const tempy = require('tempy')

test('overwrite directory', async t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1/foo.json', 1)
  writeJsonFile.sync('2/foo.json', 2)

  await renameOverwrite('1', '2')

  t.equal(loadJsonFile.sync('2/foo.json'), 1)
  t.end()
})

test('overwrite file', async t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)
  writeJsonFile.sync('2.json', 2)

  await renameOverwrite('1.json', '2.json')

  t.equal(loadJsonFile.sync('2.json'), 1)
  t.end()
})

test('rename file when no overwrite is needed', async t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)

  await renameOverwrite('1.json', '2.json')

  t.equal(loadJsonFile.sync('2.json'), 1)
  t.end()
})

test('rename directory when no overwrite is needed', async t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')

  t.equal(loadJsonFile.sync('newdir/foo.json'), 1)
  t.end()
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

test('create target directory, if it does not exist', async t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir/subdir')

  t.equal(loadJsonFile.sync('newdir/subdir/foo.json'), 1)
  t.end()
})

test('sync create target directory, if it does not exist', t => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite.sync('dir', 'newdir/subdir')

  t.equal(loadJsonFile.sync('newdir/subdir/foo.json'), 1)
  t.end()
})

test('overwrite a symlink', async t => {
  process.chdir(tempy.directory())

  fs.mkdirSync('target')
  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')
  t.equal(loadJsonFile.sync('newdir/foo.json'), 1)
  t.end()
})

test('sync overwrite a symlink', async t => {
  process.chdir(tempy.directory())

  fs.mkdirSync('target')
  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite.sync('dir', 'newdir')
  t.equal(loadJsonFile.sync('newdir/foo.json'), 1)
  t.end()
})
