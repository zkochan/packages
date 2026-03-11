'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const canLink = require('can-link')

const exdevErr = new Error('EXDEV: cross-device link not permitted')
exdevErr.code = 'EXDEV'

const eaccesErr = new Error('EACCES: permission denied, link')
eaccesErr.code = 'EACCES'

const epermErr = new Error('EPERM: permission denied, link')
epermErr.code = 'EPERM'

test('canLink.sync()', () => {
  assert.ok(canLink.sync('package.json', 'node_modules/package.json'))
  assert.ok(!canLink.sync('foo', 'bar', {
    linkSync: () => { throw exdevErr },
    unlinkSync: () => {}
  }))
  assert.ok(!canLink.sync('foo', 'bar', {
    linkSync: () => { throw eaccesErr },
    unlinkSync: () => {}
  }))
  assert.ok(!canLink.sync('foo', 'bar', {
    linkSync: () => { throw epermErr },
    unlinkSync: () => {}
  }))
  assert.throws(() => {
    const fsMock = {
      linkSync: () => { throw new Error('Error') }
    }
    canLink.sync('foo', 'bar', fsMock)
  }, /Error/)
})

test('canLink() returns true', async () => {
  const can = await canLink('package.json', 'node_modules/package.json')
  assert.ok(can)
})

test('canLink() returns false', async () => {
  const can = await canLink('package.json', 'node_modules/package.json', {
    promises: {
      link: (existingPath, newPath, cb) => Promise.reject(exdevErr),
      unlink: (p, cb) => Promise.resolve()
    }
  })
  assert.ok(!can)
})

test('canLink() returns false on EACCES error', async () => {
  const can = await canLink('package.json', 'node_modules/package.json', {
    promises: {
      link: (existingPath, newPath, cb) => Promise.reject(eaccesErr),
      unlink: (p, cb) => Promise.resolve()
    }
  })
  assert.ok(!can)
})

test('canLink() returns false on EPERM error', async () => {
  const can = await canLink('package.json', 'node_modules/package.json', {
    promises: {
      link: (existingPath, newPath, cb) => Promise.reject(epermErr),
      unlink: (p, cb) => Promise.resolve()
    }
  })
  assert.ok(!can)
})

test('canLink() non-exdev error passed through', async () => {
  await assert.rejects(
    canLink('package.json', 'node_modules/package.json', {
      promises: {
        link: (existingPath, newPath, cb) => Promise.reject(new Error('Error'))
      }
    }),
    /Error/
  )
})
