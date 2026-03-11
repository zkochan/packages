'use strict'
const ncpcb = require('ncp')
const { test } = require('node:test')
const assert = require('node:assert')
const path = require('path')
const preferredPM = require('preferred-pm')
const tempy = require('tempy')
const { promisify } = require('util')

const ncp = promisify(ncpcb)

test('preferredPM()', async () => {
  await assert.rejects(preferredPM(), { message: 'pkgPath should be a string, got undefined' })
  await assert.rejects(preferredPM(1), { message: 'pkgPath should be a string, got number' })
})

test('prefer pnpm 1 or 2', async () => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-pnpm-1-or-2'))
  assert.deepStrictEqual(pm, { name: 'pnpm', version: '1 || 2' })
})

test('prefer pnpm', async () => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-pnpm'))
  assert.deepStrictEqual(pm, { name: 'pnpm', version: '>=3' })
})

test('prefer pnpm inside a pnpm workspace', async () => {
  const pm = await preferredPM(path.join(__dirname, 'pnpm-workspace/packages/pkg'))
  assert.deepStrictEqual(pm, { name: 'pnpm', version: '>=3' })
})

test('prefer Yarn', async () => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-yarn'))
  assert.deepStrictEqual(pm, { name: 'yarn', version: '*' })
})

test('prefer Yarn inside a Yarn workspace', async () => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'yarn-workspace'), dir)
  const pm = await preferredPM(path.join(dir, 'packages/pkg'))
  assert.deepStrictEqual(pm, { name: 'yarn', version: '*' })
})

test('prefer npm inside an npm workspace', async () => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'npm-workspace'), dir)
  const pm = await preferredPM(path.join(dir, 'packages/pkg'))
  assert.deepStrictEqual(pm, { name: 'npm', version: '>=7' })
})

test('prefer Bun', async () => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-bun'))
  assert.deepStrictEqual(pm, { name: 'bun', version: '*' })
})

test('prefer npm 5', async () => {
  const pm = await preferredPM(path.join(__dirname, 'prefers-npm-5'))
  assert.deepStrictEqual(pm, { name: 'npm', version: '>=5' })
})

test('prefer npm', async () => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'prefers-npm'), dir)
  const pm = await preferredPM(dir)
  assert.deepStrictEqual(pm, { name: 'npm', version: '*' })
})

test('prefer nothing', async () => {
  const dir = tempy.directory()
  await ncp(path.join(__dirname, 'prefers-nothing'), dir)
  const pm = await preferredPM(dir)
  assert.strictEqual(pm, null)
})
