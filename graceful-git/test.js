'use strict'
const git = require('graceful-git')
const test = require('tape')

test('git command successfully completes', t => {
  git(['status'])
    .then(() => t.end())
    .catch(t.end)
})

test('git command successfully completes with no retries as well', t => {
  git.noRetry(['status'])
    .then(() => t.end())
    .catch(t.end)
})
