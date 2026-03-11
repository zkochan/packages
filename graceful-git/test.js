import { test } from 'node:test'
import { gracefulGit, noRetry } from 'graceful-git'

test('git command successfully completes', async () => {
  await gracefulGit(['status'])
})

test('git command successfully completes with no retries as well', async () => {
  await noRetry(['status'])
})
