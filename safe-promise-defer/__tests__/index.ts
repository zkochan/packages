import safePromiseDefer from '../src'

test('safePromiseDefer resolves', async () => {
  const p = safePromiseDefer()
  p.resolve(1)
  expect(await p()).toBe(1)
})

test('safePromiseDefer rejects', async () => {
  const p = safePromiseDefer()
  p.reject(new Error('hello'))
  await expect(p()).rejects.toThrow('hello')
})
