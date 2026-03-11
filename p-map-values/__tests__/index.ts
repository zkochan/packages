import { test } from 'node:test'
import assert from 'node:assert'
import { pMapValues } from '../src/index.ts'

test('pMapValues', async () => {
  assert.deepStrictEqual(await pMapValues(async (value: number) => value * 2, {a: 1, b: 2}), {a: 2, b: 4})
})
