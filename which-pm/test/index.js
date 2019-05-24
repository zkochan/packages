'use strict'
const test = require('tape')
const path = require('path')
const whichpm = require('which-pm')

const fixturesDir = path.join(__dirname, 'fixtures')

test('identifies pnpm installation', async t => {
  const pm = await whichpm(path.join(fixturesDir, 'pnpm'))
  t.deepEqual(pm, { name: 'pnpm', version: '0.70.0' })
  t.end()
})

test('identifies pnpm installation', async t => {
  const pm = await whichpm(path.join(fixturesDir, 'scoped-pnpm'))
  t.deepEqual(pm, { name: '@zkochan/pnpm', version: '0.70.0' })
  t.end()
})

test('identifies yarn installation', async t => {
  const pm = await whichpm(path.join(fixturesDir, 'yarn'))
  t.deepEqual(pm, { name: 'yarn' })
  t.end()
})

test('identifies npm installation', async t => {
  const pm = await whichpm(path.join(fixturesDir, 'npm'))
  t.deepEqual(pm, { name: 'npm' })
  t.end()
})

test('identifies null installation', async t => {
  const pm = await whichpm(path.join(fixturesDir, 'null'))
  t.equal(pm, null)
  t.end()
})
