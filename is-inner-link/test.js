'use strict'
const test = require('tape')
const isInnerLink = require('is-inner-link')
const makeDir = require('make-dir')
const path = require('path')
const symlinkDir = require('symlink-dir').default

test('is inner', async t => {
  const target = path.resolve('.tmp', '1', 'a', 'b')
  makeDir.sync(target)
  await symlinkDir(target, path.join(target, '..', '..', 'b'))
  const link = await isInnerLink(path.resolve('.tmp', '1'), 'b')
  t.ok(link.isInner)
  t.equal(typeof link.target, 'string')
  t.end()
})

test('is not inner', async t => {
  const dest = path.resolve('.tmp', '2', 'a')
  const target = path.resolve('.tmp', '2', 'b')
  makeDir.sync(target)
  await symlinkDir(target, path.join(dest, 'b'))
  const link = await isInnerLink(dest, 'b')
  t.ok(!link.isInner)
  t.equal(typeof link.target, 'string')
  t.end()
})
