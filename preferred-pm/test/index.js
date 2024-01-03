'use strict'
const ncpcb = require('ncp')
const test = require('tape')
const path = require('path')
const preferredPM = require('preferred-pm')
const tempy = require('tempy')
const { promisify } = require('util')

const ncp = promisify(ncpcb)

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

test('prefer pnpm 1 or 2', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-pnpm-1-or-2'))
  t.deepEqual(pm, { name: 'pnpm', version: '1 || 2' })
  t.end()
})

test('prefer pnpm', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-pnpm'))
  t.deepEqual(pm, { name: 'pnpm', version: '>=3' })
  t.end()
})

test('prefer pnpm inside a pnpm workspace', async t => {
  const pm = await preferredPM(path.join(__dirname, 'pnpm-workspace/packages/pkg'))
  t.deepEqual(pm, { name: 'pnpm', version: '>=3' })
  t.end()
})

test('prefer Yarn', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-yarn'))
  t.deepEqual(pm, { name: 'yarn', version: '*' })
  t.end()
})

test('prefer Yarn inside a Yarn workspace', async t => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'yarn-workspace'), dir)
  const pm = await preferredPM(path.join(dir, 'packages/pkg'))
  t.deepEqual(pm, { name: 'yarn', version: '*' })
  t.end()
})

test('prefer npm inside an npm workspace', async t => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'npm-workspace'), dir)
  const pm = await preferredPM(path.join(dir, 'packages/pkg'))
  t.deepEqual(pm, { name: 'npm', version: '>=7' })
  t.end()
})

test('prefer Bun', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-bun'))
  t.deepEqual(pm, { name: 'bun', version: '*' })
  t.end()
})

test('prefer npm 5', async t => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-npm-5'))
  t.deepEqual(pm, { name: 'npm', version: '>=5' })
  t.end()
})

test('prefer npm', async t => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'prefers-npm'), dir)
  const pm = await preferredPM(dir)
  t.deepEqual(pm, { name: 'npm', version: '*' })
  t.end()
})

test('prefer nothing', async t => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'prefers-nothing'), dir)
  const pm = await preferredPM(dir)
  t.equal(pm, null)
  t.end()
})
