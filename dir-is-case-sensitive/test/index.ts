import dirIsCaseSensitive from 'dir-is-case-sensitive'
import test from 'tape'

test('dirIsCaseSensitive()', async (t) => {
  const isCaseSensitive = await dirIsCaseSensitive(import.meta.dirname)
  t.equal(typeof isCaseSensitive, 'boolean')
  t.comment(isCaseSensitive ? 'directory is case sensitive' : 'directory is not case sensitive')
  t.end()
})
