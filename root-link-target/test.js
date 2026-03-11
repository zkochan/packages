import { test } from 'node:test'
import assert from 'node:assert'
import { rootLinkTarget, rootLinkTargetSync } from 'root-link-target'

test('rootLinkTargetSync()', () => {
  assert.strictEqual(typeof rootLinkTargetSync('package.json'), 'string')
})

test('rootLinkTarget()', async () => {
  const root = await rootLinkTarget('package.json')
  assert.strictEqual(typeof root, 'string')
})
