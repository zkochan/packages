'use strict'
const test = require('tape')
const path = require('path')
const preferredPM = require('preferred-pm')

test('preferredPM()', t => {
  t.throws(() => preferredPM(), /pkgPath should be a string/)
  t.throws(() => preferredPM(1), /pkgPath should be a string/)
  t.end()
})

test('prefer pnpm', t => {
  preferredPM(path.join(__dirname, 'prefers-pnpm'))
    .then(pm => {
      t.deepEqual(pm, { name: 'pnpm', version: '*' })
      t.end()
    })
    .catch(t.end)
})

test('prefer Yarn', t => {
  preferredPM(path.join(__dirname, 'prefers-yarn'))
    .then(pm => {
      t.deepEqual(pm, { name: 'yarn', version: '*' })
      t.end()
    })
    .catch(t.end)
})

test('prefer npm 5', t => {
  preferredPM(path.join(__dirname, 'prefers-npm-5'))
    .then(pm => {
      t.deepEqual(pm, { name: 'npm', version: '>=5' })
      t.end()
    })
    .catch(t.end)
})

test('prefer npm', t => {
  preferredPM(path.join(__dirname, 'prefers-npm'))
    .then(pm => {
      t.deepEqual(pm, { name: 'npm', version: '*' })
      t.end()
    })
    .catch(t.end)
})

test('prefer nothing', t => {
  preferredPM(path.join(__dirname, 'prefers-nothing'))
    .then(pm => {
      t.equal(pm, null)
      t.end()
    })
    .catch(t.end)
})
