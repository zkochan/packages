'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const canWriteToDir = require('can-write-to-dir')

const eaccesErr = new Error('EACCES: permission denied, link')
eaccesErr.code = 'EACCES'

const epermErr = new Error('EPERM: permission denied, link')
epermErr.code = 'EPERM'

test('canWriteToDir.sync()', () => {
  assert.ok(canWriteToDir.sync(process.cwd()))
  assert.ok(!canWriteToDir.sync('/foo', {
    writeFileSync: () => { throw eaccesErr },
    unlinkSync: () => {}
  }))
  assert.ok(!canWriteToDir.sync('foo', {
    writeFileSync: () => { throw epermErr },
    unlinkSync: () => {}
  }))
  assert.throws(() => {
    const fsMock = {
      linkSync: () => { throw new Error('Error') }
    }
    canWriteToDir.sync('foo', 'bar', fsMock)
  }, /Error/)
})

test('canWriteToDir() returns true', async () => {
  assert.ok(await canWriteToDir(process.cwd()))
})

test('canWriteToDir() returns false on EACCES error', async () => {
  assert.ok(!await canWriteToDir('/', {
    promises: {
      writeFile: (a1, a2, a3, cb) => Promise.reject(eaccesErr),
      unlink: (p, cb) => Promise.resolve()
    }
  }))
})

test('canWriteToDir() returns false on EPERM error', async () => {
  assert.ok(!await canWriteToDir('/', {
    promises: {
      writeFile: (a1, a2, a3, cb) => Promise.reject(epermErr),
      unlink: (p, cb) => Promise.resolve()
    }
  }))
})

test('canWriteToDir() non-exdev error passed through', async () => {
  await assert.rejects(
    canWriteToDir('/', {
      writeFile: (a1, a2, a3, cb) => cb(new Error('Error'))
    }),
    /Error/
  )
})
