const path = require('path')
const fs = require('fs')
const test = require('tape')
const tempfile = require('tempfile')
const writeJson5File = require('.')

test('async', async t => {
  const tmp = path.join(tempfile(), 'foo')
  await writeJson5File(tmp, { foo: true }, { indent: 2 })
  t.equal(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true,\n}\n')
  t.end()
})

test('sync', t => {
  const tmp = path.join(tempfile(), 'foo')
  writeJson5File.sync(tmp, { foo: true }, { indent: 2 })
  t.equal(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true,\n}\n')
  t.end()
})
