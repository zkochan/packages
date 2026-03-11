import { test } from 'node:test'
import assert from 'node:assert'
import { dirIsCaseSensitive } from 'dir-is-case-sensitive'

test('dirIsCaseSensitive()', async () => {
  const isCaseSensitive = await dirIsCaseSensitive(import.meta.dirname)
  assert.strictEqual(typeof isCaseSensitive, 'boolean')
})
