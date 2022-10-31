'use strict'
const fs = require('fs')
const path = require('path')
const writeJsonFile = require('write-json-file')
const loadJsonFile = require('load-json-file')
const renameOverwrite = require('rename-overwrite')
const symlinkDir = require('symlink-dir')
const tempy = require('tempy')

jest.mock('fs', () => {
  const fs = jest.requireActual('fs')
  return {
    ...fs,
    renameSync: jest.fn(fs.renameSync),
    promises: {
      ...fs.promises,
      rename: jest.fn(fs.promises.rename),
    },
  }
})

test('overwrite directory', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1/foo.json', 1)
  writeJsonFile.sync('2/foo.json', 2)

  await renameOverwrite('1', '2')

  expect(loadJsonFile.sync('2/foo.json')).toBe(1)
})

describe('moving across devices synchronously', () => {
  beforeAll(() => {
    process.chdir(tempy.directory())

    writeJsonFile.sync('1/foo.json', 1)
    writeJsonFile.sync('2/foo.json', 2)

    fs.renameSync.mockImplementation(() => {
      throw Object.assign(new Error('EXDEV'), { code: 'EXDEV' })
    })
  })
  afterAll(() => {
    const { renameSync } = jest.requireActual('fs')
    fs.renameSync.mockImplementation(renameSync)
  })
  it('should overwrite directory across devices', () => {
    renameOverwrite.sync('1', '2')

    expect(loadJsonFile.sync('2/foo.json')).toBe(1)
  });
})

describe('moving across devices asynchronously', () => {
  beforeAll(() => {
    process.chdir(tempy.directory())

    writeJsonFile.sync('1/foo.json', 1)
    writeJsonFile.sync('2/foo.json', 2)

    fs.promises.rename.mockImplementation(async () => {
      throw Object.assign(new Error('EXDEV'), { code: 'EXDEV' })
    })
  })
  afterAll(() => {
    const { promises } = jest.requireActual('fs')
    fs.promises.rename.mockImplementation(promises.rename)
  })
  it('should overwrite directory across devices', async () => {
    await renameOverwrite('1', '2')

    expect(loadJsonFile.sync('2/foo.json')).toBe(1)
  });
})

test('overwrite file', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)
  writeJsonFile.sync('2.json', 2)

  await renameOverwrite('1.json', '2.json')

  expect(loadJsonFile.sync('2.json')).toBe(1)
})

test('rename file when no overwrite is needed', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)

  await renameOverwrite('1.json', '2.json')

  expect(loadJsonFile.sync('2.json')).toBe(1)
})

test('rename directory when no overwrite is needed', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')

  expect(loadJsonFile.sync('newdir/foo.json')).toBe(1)
})

test('sync overwrite directory', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1/foo.json', 1)
  writeJsonFile.sync('2/foo.json', 2)

  renameOverwrite.sync('1', '2')

  expect(loadJsonFile.sync('2/foo.json')).toBe(1)
})

test('sync overwrite file', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)
  writeJsonFile.sync('2.json', 2)

  renameOverwrite.sync('1.json', '2.json')

  expect(loadJsonFile.sync('2.json')).toBe(1)
})

test('sync rename file when no overwrite is needed', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('1.json', 1)

  renameOverwrite.sync('1.json', '2.json')

  expect(loadJsonFile.sync('2.json')).toBe(1)
})

test('sync rename directory when no overwrite is needed', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite.sync('dir', 'newdir')

  expect(loadJsonFile.sync('newdir/foo.json')).toBe(1)
})

test('create target directory, if it does not exist', async () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir/subdir')

  expect(loadJsonFile.sync('newdir/subdir/foo.json')).toBe(1)
})

test('sync create target directory, if it does not exist', () => {
  process.chdir(tempy.directory())

  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite.sync('dir', 'newdir/subdir')

  expect(loadJsonFile.sync('newdir/subdir/foo.json')).toBe(1)
})

test('overwrite a symlink', async () => {
  process.chdir(tempy.directory())

  fs.mkdirSync('target')
  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')
  expect(loadJsonFile.sync('newdir/foo.json')).toBe(1)
})

test('sync overwrite a symlink', async () => {
  process.chdir(tempy.directory())

  fs.mkdirSync('target')
  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite.sync('dir', 'newdir')
  expect(loadJsonFile.sync('newdir/foo.json')).toBe(1)
})

test('overwrite a broken symlink', async () => {
  process.chdir(tempy.directory())

  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  await renameOverwrite('dir', 'newdir')
  expect(loadJsonFile.sync('newdir/foo.json')).toBe(1)
})

test('sync overwrite a broken symlink', async () => {
  process.chdir(tempy.directory())

  await symlinkDir(path.resolve('target'), 'newdir')
  writeJsonFile.sync('dir/foo.json', 1)

  renameOverwrite.sync('dir', 'newdir')
  expect(loadJsonFile.sync('newdir/foo.json')).toBe(1)
})
