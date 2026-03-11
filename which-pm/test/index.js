'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const path = require('path')
const whichpm = require('which-pm')

const fixturesDir = path.join(__dirname, 'fixtures')

test('identifies pnpm installation', async () => {
  const pm = await whichpm(path.join(fixturesDir, 'pnpm'))
  assert.deepStrictEqual(pm, { name: 'pnpm', version: '0.70.0' })
})

test('identifies scoped pnpm installation', async () => {
  const pm = await whichpm(path.join(fixturesDir, 'scoped-pnpm'))
  assert.deepStrictEqual(pm, { name: '@zkochan/pnpm', version: '0.70.0' })
})

test('identifies yarn installation', async () => {
  const pm = await whichpm(path.join(fixturesDir, 'yarn'))
  assert.deepStrictEqual(pm, { name: 'yarn' })
})

test('identifies bun installation', async () => {
  const pm = await whichpm(path.join(fixturesDir, 'bun'))
  assert.deepStrictEqual(pm, { name: 'bun' })
})

test('identifies npm installation', async () => {
  const pm = await whichpm(path.join(fixturesDir, 'npm'))
  assert.deepStrictEqual(pm, { name: 'npm' })
})

test('identifies null installation', async () => {
  const pm = await whichpm(path.join(fixturesDir, 'null'))
  assert.strictEqual(pm, null)
})
