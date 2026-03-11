import { test } from 'node:test'
import assert from 'node:assert'
import { realpathMissing } from './index.js'

test('realpathMissing()', async () => {
  assert.strictEqual(typeof await realpathMissing('package.json'), 'string')
  assert.strictEqual(typeof await realpathMissing('missing-file'), 'string')
})
