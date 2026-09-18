import assert from 'node:assert'
import { test } from 'node:test'
import { gracefulGit, noRetry } from 'graceful-git'

const AUTHOR_ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: 'Graceful Git',
  GIT_AUTHOR_EMAIL: 'graceful-git@example.com',
}

test('git command successfully completes', async () => {
  await gracefulGit(['status'])
})

test('git command successfully completes with no retries as well', async () => {
  await noRetry(['status'])
})

test('the env option reaches the spawned git process', async () => {
  const { stdout } = await gracefulGit(['var', 'GIT_AUTHOR_IDENT'], { env: AUTHOR_ENV })
  assert.match(stdout, /^Graceful Git <graceful-git@example\.com>/)
})

test('the env option reaches the spawned git process with no retries as well', async () => {
  const { stdout } = await noRetry(['var', 'GIT_AUTHOR_IDENT'], { env: AUTHOR_ENV })
  assert.match(stdout, /^Graceful Git <graceful-git@example\.com>/)
})
