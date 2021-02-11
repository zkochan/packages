'use strict'
const test = require('tape')
const canLink = require('can-link')

const exdevErr = new Error('EXDEV: cross-device link not permitted')
exdevErr.code = 'EXDEV'

const eaccesErr = new Error('EACCES: permission denied, link')
eaccesErr.code = 'EACCES'

const epermErr = new Error('EPERM: permission denied, link')
epermErr.code = 'EPERM'

test('canLink.sync()', t => {
  t.ok(canLink.sync('package.json', 'node_modules/package.json'))
  t.notOk(canLink.sync('foo', 'bar', {
    linkSync: () => { throw exdevErr },
    unlinkSync: () => {}
  }), 'cannot link on EXDEV error')
  t.notOk(canLink.sync('foo', 'bar', {
    linkSync: () => { throw eaccesErr },
    unlinkSync: () => {}
  }), 'cannot link on EACCES error')
  t.notOk(canLink.sync('foo', 'bar', {
    linkSync: () => { throw epermErr },
    unlinkSync: () => {}
  }), 'cannot link on EPERM error')
  t.throws(() => {
    const fsMock = {
      linkSync: () => { throw new Error('Error') }
    }
    canLink.sync('foo', 'bar', fsMock)
  }, /Error/, 'errors are passed through if they are not EXDEV')
  t.end()
})

test('canLink() returns true', t => {
  canLink('package.json', 'node_modules/package.json')
    .then(can => {
      t.ok(can)
      t.end()
    })
    .catch(t.end)
})

test('canLink() returns false', t => {
  canLink('package.json', 'node_modules/package.json', {
    promises: {
      link: (existingPath, newPath, cb) => Promise.reject(exdevErr),
      unlink: (p, cb) => Promise.resolve()
    }
  })
    .then(can => {
      t.notOk(can)
      t.end()
    })
    .catch(t.end)
})

test('canLink() returns false on EACCES error', t => {
  canLink('package.json', 'node_modules/package.json', {
    promises: {
      link: (existingPath, newPath, cb) => Promise.reject(eaccesErr),
      unlink: (p, cb) => Promise.resolve()
    }
  })
    .then(can => {
      t.notOk(can)
      t.end()
    })
    .catch(t.end)
})

test('canLink() returns false on EPERM error', async t => {
  const can = await canLink('package.json', 'node_modules/package.json', {
    promises: {
      link: (existingPath, newPath, cb) => Promise.reject(epermErr),
      unlink: (p, cb) => cb()
    }
  })
  t.notOk(can)
  t.end()
})

test('canLink() non-exdev error passed through', t => {
  canLink('package.json', 'node_modules/package.json', {
    promises: {
      link: (existingPath, newPath, cb) => Promise.reject(new Error('Error'))
    }
  })
    .then(can => {
      t.fail('should have failed')
    })
    .catch(err => {
      t.ok(err)
      t.end()
    })
})
