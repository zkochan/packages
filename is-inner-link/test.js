import { test } from 'node:test'
import assert from 'node:assert'
import { isInnerLink } from 'is-inner-link'
import makeDir from 'make-dir'
import path from 'node:path'
import symlinkDir from 'symlink-dir'

test('is inner', async () => {
  const target = path.resolve('.tmp', '1', 'a', 'b')
  makeDir.sync(target)
  await symlinkDir(target, path.join(target, '..', '..', 'b'))
  const link = await isInnerLink(path.resolve('.tmp', '1'), 'b')
  assert.ok(link.isInner)
  assert.strictEqual(typeof link.target, 'string')
})

test('is not inner', async () => {
  const dest = path.resolve('.tmp', '2', 'a')
  const target = path.resolve('.tmp', '2', 'b')
  makeDir.sync(target)
  await symlinkDir(target, path.join(dest, 'b'))
  const link = await isInnerLink(dest, 'b')
  assert.ok(!link.isInner)
  assert.strictEqual(typeof link.target, 'string')
})
