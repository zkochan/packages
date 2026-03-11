import { test } from 'node:test'
import assert from 'node:assert'
import { canLink, canLinkSync } from 'can-link'

const exdevErr = new Error('EXDEV: cross-device link not permitted')
exdevErr.code = 'EXDEV'

const eaccesErr = new Error('EACCES: permission denied, link')
eaccesErr.code = 'EACCES'

const epermErr = new Error('EPERM: permission denied, link')
epermErr.code = 'EPERM'

test('canLinkSync()', () => {
  assert.ok(canLinkSync('package.json', 'node_modules/package.json'))
  assert.ok(!canLinkSync('foo', 'bar', {
    linkSync: () => { throw exdevErr },
    unlinkSync: () => {}
  }))
  assert.ok(!canLinkSync('foo', 'bar', {
    linkSync: () => { throw eaccesErr },
    unlinkSync: () => {}
  }))
  assert.ok(!canLinkSync('foo', 'bar', {
    linkSync: () => { throw epermErr },
    unlinkSync: () => {}
  }))
  assert.throws(() => {
    const fsMock = {
      linkSync: () => { throw new Error('Error') }
    }
    canLinkSync('foo', 'bar', fsMock)
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
