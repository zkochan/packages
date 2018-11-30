const path = require('path')
const fs = require('fs')
const test = require('tape')
const tempfile = require('tempfile')
const m = require('write-ini-file')

test('async', t => {
  const tmp = path.join(tempfile(), 'foo')
  m(tmp, { foo: true }, { indent: 2 })
    .then(() => {
      t.equal(fs.readFileSync(tmp, 'utf8'), 'foo=true\n')
      t.end()
    })
    .catch(t.end)
})

test('sync', t => {
  const tmp = path.join(tempfile(), 'foo')
  m.sync(tmp, { foo: true }, { indent: 2 })
  t.equal(fs.readFileSync(tmp, 'utf8'), 'foo=true\n')
  t.end()
})
