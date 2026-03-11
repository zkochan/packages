import { test } from 'node:test'
import assert from 'node:assert'
import { safeDeferredPromise as safePromiseDefer } from '../src/index.ts'

test('safePromiseDefer resolves', async () => {
  const p = safePromiseDefer()
  p.resolve(1)
  assert.strictEqual(await p(), 1)
})

test('safePromiseDefer rejects', async () => {
  const p = safePromiseDefer()
  p.reject(new Error('hello'))
  await assert.rejects(p(), { message: 'hello' })
})
