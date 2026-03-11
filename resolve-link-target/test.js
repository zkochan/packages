import { test } from 'node:test'
import assert from 'node:assert'
import { resolveLinkTarget, resolveLinkTargetSync } from './index.js'
import symlinkDir from 'symlink-dir'
import path from 'node:path'

test('resolveLinkTarget()', async () => {
  await symlinkDir('node_modules', 'node_modules_link')
  const target = await resolveLinkTarget('node_modules_link')
  assert.strictEqual(target, path.resolve('node_modules'))
})

test('resolveLinkTargetSync()', async () => {
  await symlinkDir('node_modules', 'node_modules_link')
  assert.strictEqual(resolveLinkTargetSync('node_modules_link'), path.resolve('node_modules'))
})
