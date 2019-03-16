import dirIsCaseSensitive from 'dir-is-case-sensitive'
import test = require('tape')

test('dirIsCaseSensitive()', async (t) => {
  const isCaseSensitive = await dirIsCaseSensitive(__dirname)
  t.equal(typeof isCaseSensitive, 'boolean')
  t.comment(isCaseSensitive ? 'directory is case sensitive' : 'directory is not case sensitive')
  t.end()
})
