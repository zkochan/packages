import pMapValues from '../src'

test('pMapValues', async () => {
  expect(await pMapValues(async (value: number) => value * 2, {a: 1, b: 2})).toEqual({a: 2, b: 4})
})

test('pMapValues - with simulated async work', async () => {
  const delay = async (milliseconds: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds)
    });
  }
  const input = {a: 1, b: 2};

  const mapped = await pMapValues(async (value: number) => {
    await delay((2 - value) * 100);
    return value * 2;
  }, input);

  const expected= {a: 2, b: 4};

  expect(Object.keys(mapped)).toStrictEqual(Object.keys(expected));
  expect(mapped).toStrictEqual(expected);
})
