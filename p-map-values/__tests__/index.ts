import pMapValues from '../src'

test('pMapValues', async () => {
  expect(await pMapValues(async (value: number) => value * 2, {a: 1, b: 2})).toEqual({a: 2, b: 4})
})
