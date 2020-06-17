'use strict'
const test = require('tape')
const canWriteToDir = require('can-write-to-dir')

const eaccesErr = new Error('EACCES: permission denied, link')
eaccesErr.code = 'EACCES'

const epermErr = new Error('EPERM: permission denied, link')
epermErr.code = 'EPERM'

test('canWriteToDir.sync()', t => {
  t.ok(canWriteToDir.sync(process.cwd()))
  t.notOk(canWriteToDir.sync('/foo', {
    writeFileSync: () => { throw eaccesErr },
    unlinkSync: () => {}
  }), 'cannot link on EACCES error')
  t.notOk(canWriteToDir.sync('foo', {
    writeFileSync: () => { throw epermErr },
    unlinkSync: () => {}
  }), 'cannot link on EPERM error')
  t.throws(() => {
    const fsMock = {
      linkSync: () => { throw new Error('Error') }
    }
    canWriteToDir.sync('foo', 'bar', fsMock)
  }, /Error/, 'errors are passed through if they are not EXDEV')
  t.end()
})

test('canWriteToDir() returns true', async t => {
  t.ok(await canWriteToDir(process.cwd()))
  t.end()
})

test('canWriteToDir() returns false on EACCES error', async t => {
  t.notOk(await canWriteToDir('/', {
    writeFile: (a1, a2, a3, cb) => cb(eaccesErr),
    unlink: (p, cb) => cb()
  }))
  t.end()
})

test('canWriteToDir() returns false on EACCES error', async t => {
  t.notOk(await canWriteToDir('/', {
    writeFile: (a1, a2, a3, cb) => cb(epermErr),
    unlink: (p, cb) => cb()
  }))
  t.end()
})

test('canWriteToDir() non-exdev error passed through', async t => {
  let err
  try {
    await canWriteToDir('/', {
      writeFile: (a1, a2, a3, cb) => cb(new Error('Error'))
    })
  } catch (_err) {
    err = _err
  }
  t.ok(err)
  t.end()
})
