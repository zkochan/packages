import { test } from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { whichPM } from 'which-pm'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixturesDir = path.join(__dirname, 'fixtures')

test('identifies pnpm installation', async () => {
  const pm = await whichPM(path.join(fixturesDir, 'pnpm'))
  assert.deepStrictEqual(pm, { name: 'pnpm', version: '0.70.0' })
})

test('identifies scoped pnpm installation', async () => {
  const pm = await whichPM(path.join(fixturesDir, 'scoped-pnpm'))
  assert.deepStrictEqual(pm, { name: '@zkochan/pnpm', version: '0.70.0' })
})

test('identifies yarn installation', async () => {
  const pm = await whichPM(path.join(fixturesDir, 'yarn'))
  assert.deepStrictEqual(pm, { name: 'yarn' })
})

test('identifies bun installation', async () => {
  const pm = await whichPM(path.join(fixturesDir, 'bun'))
  assert.deepStrictEqual(pm, { name: 'bun' })
})

test('identifies npm installation', async () => {
  const pm = await whichPM(path.join(fixturesDir, 'npm'))
  assert.deepStrictEqual(pm, { name: 'npm' })
})

test('identifies null installation', async () => {
  const pm = await whichPM(path.join(fixturesDir, 'null'))
  assert.strictEqual(pm, null)
})
