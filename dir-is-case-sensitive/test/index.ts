import { test } from 'node:test'
import assert from 'node:assert'
import dirIsCaseSensitiveModule from 'dir-is-case-sensitive'

const dirIsCaseSensitive = dirIsCaseSensitiveModule.default ?? dirIsCaseSensitiveModule

test('dirIsCaseSensitive()', async () => {
  const isCaseSensitive = await dirIsCaseSensitive(import.meta.dirname)
  assert.strictEqual(typeof isCaseSensitive, 'boolean')
})
