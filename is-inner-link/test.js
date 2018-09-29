'use strict'
const test = require('tape')
const isInnerLink = require('is-inner-link')
const mkdirp = require('mkdirp')
const path = require('path')
const symlinkDir = require('symlink-dir').default

test('is inner', t => {
  const target = path.resolve('.tmp', '1', 'a', 'b')
  mkdirp.sync(target)
  symlinkDir(target, path.join(target, '..', '..', 'b'))
    .then(() => isInnerLink(path.resolve('.tmp', '1'), 'b'))
    .then(link => {
      t.ok(link.isInner)
      t.equal(typeof link.target, 'string')
      t.end()
    })
    .catch(t.end)
})

test('is not inner', t => {
  const dest = path.resolve('.tmp', '2', 'a')
  const target = path.resolve('.tmp', '2', 'b')
  mkdirp.sync(target)
  symlinkDir(target, path.join(dest, 'b'))
    .then(() => isInnerLink(dest, 'b'))
    .then(link => {
      t.ok(!link.isInner)
      t.equal(typeof link.target, 'string')
      t.end()
    })
    .catch(t.end)
})
