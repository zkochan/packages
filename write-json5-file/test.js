const path = require('path')
const fs = require('fs')
const test = require('tape')
const tempfile = require('tempfile')
const m = require('.')

test('async', t => {
  const tmp = path.join(tempfile(), 'foo')
  m(tmp, {foo: true}, {indent: 2})
    .then(() => {
      t.equal(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true\n}\n')
      t.end()
    })
    .catch(t.end)
})

test('sync', t => {
  const tmp = path.join(tempfile(), 'foo')
  m.sync(tmp, {foo: true}, {indent: 2})
  t.equal(fs.readFileSync(tmp, 'utf8'), '{\n  foo: true\n}\n')
  t.end()
})
