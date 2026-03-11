import fs from 'node:fs'
import path from 'node:path'
import { test, describe } from 'node:test'
import assert from 'node:assert'
import writeJsonFile from 'write-json-file'
import loadJsonFile from 'load-json-file'
import { renameOverwrite, renameOverwriteSync } from 'rename-overwrite'
import symlinkDir from 'symlink-dir'
import tempy from 'tempy'

test('overwrite directory', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1/foo.json', 1)
  writeJsonFile.sync('2/foo.json', 2)

  await renameOverwrite('1', '2')

  assert.strictEqual(loadJsonFile.sync('2/foo.json'), 1)
})

test('overwrite file', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)
  writeJsonFile.sync('2.json', 2)

  await renameOverwrite('1.json', '2.json')

  assert.strictEqual(loadJsonFile.sync('2.json'), 1)
})

test('rename file when no overwrite is needed', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)

  await renameOverwrite('1.json', '2.json')

  assert.strictEqual(loadJsonFile.sync('2.json'), 1)
})

test('rename directory when no overwrite is needed', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')

  assert.strictEqual(loadJsonFile.sync('newdir/foo.json'), 1)
})

test('sync overwrite directory', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1/foo.json', 1)
  writeJsonFile.sync('2/foo.json', 2)

  renameOverwriteSync('1', '2')

  assert.strictEqual(loadJsonFile.sync('2/foo.json'), 1)
})

test('sync overwrite file', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)
  writeJsonFile.sync('2.json', 2)

  renameOverwriteSync('1.json', '2.json')

  assert.strictEqual(loadJsonFile.sync('2.json'), 1)
})

test('sync rename file when no overwrite is needed', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)

  renameOverwriteSync('1.json', '2.json')

  assert.strictEqual(loadJsonFile.sync('2.json'), 1)
})

test('sync rename directory when no overwrite is needed', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwriteSync('dir', 'newdir')

  assert.strictEqual(loadJsonFile.sync('newdir/foo.json'), 1)
})

test('create target directory, if it does not exist', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir/subdir')

  assert.strictEqual(loadJsonFile.sync('newdir/subdir/foo.json'), 1)
})

test('sync create target directory, if it does not exist', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwriteSync('dir', 'newdir/subdir')

  assert.strictEqual(loadJsonFile.sync('newdir/subdir/foo.json'), 1)
})

test('overwrite a symlink', async () => {
  process.chdir(tempy.directory())

  fs.mkdirSync('target')
  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')
  assert.strictEqual(loadJsonFile.sync('newdir/foo.json'), 1)
})

test('sync overwrite a symlink', async () => {
  process.chdir(tempy.directory())

  fs.mkdirSync('target')
  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwriteSync('dir', 'newdir')
  assert.strictEqual(loadJsonFile.sync('newdir/foo.json'), 1)
})

test('overwrite a broken symlink', async () => {
  process.chdir(tempy.directory())

  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')
  assert.strictEqual(loadJsonFile.sync('newdir/foo.json'), 1)
})

test('sync overwrite a broken symlink', async () => {
  process.chdir(tempy.directory())

  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwriteSync('dir', 'newdir')
  assert.strictEqual(loadJsonFile.sync('newdir/foo.json'), 1)
})

describe('moving across devices synchronously', () => {
  test('should overwrite directory across devices', () => {
    process.chdir(tempy.directory())

    writeJsonFile.sync('1/foo.json', 1)
    writeJsonFile.sync('2/foo.json', 2)

    const origRenameSync = fs.renameSync
    fs.renameSync = () => {
      throw Object.assign(new Error('EXDEV'), { code: 'EXDEV' })
    }
    try {
      renameOverwriteSync('1', '2')
      assert.strictEqual(loadJsonFile.sync('2/foo.json'), 1)
    } finally {
      fs.renameSync = origRenameSync
    }
  })
})

describe('moving across devices asynchronously', () => {
  test('should overwrite directory across devices', async () => {
    process.chdir(tempy.directory())

    writeJsonFile.sync('1/foo.json', 1)
    writeJsonFile.sync('2/foo.json', 2)

    const origRename = fs.promises.rename
    fs.promises.rename = async () => {
      throw Object.assign(new Error('EXDEV'), { code: 'EXDEV' })
    }
    try {
      await renameOverwrite('1', '2')
      assert.strictEqual(loadJsonFile.sync('2/foo.json'), 1)
    } finally {
      fs.promises.rename = origRename
    }
  })
})
