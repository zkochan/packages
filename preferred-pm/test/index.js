'use strict'
const test = require('tape')
const path = require('path')
const preferredPM = require('preferred-pm')

test('preferredPM()', async t => {
  t.plan(2)
  try {
    await preferredPM()
  } catch (err) {
    t.equal(err.message, 'pkgPath should be a string, got undefined')
  }
  try {
    await preferredPM(1)
  } catch (err) {
    t.equal(err.message, 'pkgPath should be a string, got number')
  }
  t.end()
})

test('prefer pnpm', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-pnpm'))
  t.deepEqual(pm, { name: 'pnpm', version: '*' })
  t.end()
})

test('prefer Yarn', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-yarn'))
  t.deepEqual(pm, { name: 'yarn', version: '*' })
  t.end()
})

test('prefer npm 5', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-npm-5'))
  t.deepEqual(pm, { name: 'npm', version: '>=5' })
  t.end()
})

test('prefer npm', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-npm'))
  t.deepEqual(pm, { name: 'npm', version: '*' })
  t.end()
})

test('prefer nothing', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-nothing'))
  t.equal(pm, null)
  t.end()
})
