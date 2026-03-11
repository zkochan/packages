'use strict'
const { test } = require('node:test')
const git = require('graceful-git')

test('git command successfully completes', async () => {
  await git(['status'])
})

test('git command successfully completes with no retries as well', async () => {
  await git.noRetry(['status'])
})
