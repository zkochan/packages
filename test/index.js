'use strict'
const test = require('tape')
const path = require('path')
const whichpm = require('..')

const fixturesDir = path.join(__dirname, 'fixtures')

test('identifies pnpm installation', t => {
  whichpm(path.join(fixturesDir, 'pnpm'))
    .then(pm => {
      t.deepEqual(pm, {name: 'pnpm', version: '0.70.0'})
      t.end()
    })
    .catch(t.end)
})

test('identifies pnpm installation', t => {
  whichpm(path.join(fixturesDir, 'scoped-pnpm'))
    .then(pm => {
      t.deepEqual(pm, {name: '@zkochan/pnpm', version: '0.70.0'})
      t.end()
    })
    .catch(t.end)
})

test('identifies yarn installation', t => {
  whichpm(path.join(fixturesDir, 'yarn'))
    .then(pm => {
      t.deepEqual(pm, {name: 'yarn'})
      t.end()
    })
    .catch(t.end)
})

test('identifies npm installation', t => {
  whichpm(path.join(fixturesDir, 'npm'))
    .then(pm => {
      t.deepEqual(pm, {name: 'npm'})
      t.end()
    })
    .catch(t.end)
})

test('identifies null installation', t => {
  whichpm(path.join(fixturesDir, 'null'))
    .then(pm => {
      t.equal(pm, null)
      t.end()
    })
    .catch(t.end)
})
