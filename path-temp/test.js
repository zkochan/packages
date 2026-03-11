'use strict'
const path = require('path')
const { test } = require('node:test')
const assert = require('node:assert')
const pathTemp = require('path-temp')

test('pathTemp', () => {
  assert.strictEqual(typeof pathTemp(process.cwd()), 'string')
})

test('fastPathTemp', () => {
  const workerThreads = require('node:worker_threads')
  assert.strictEqual(pathTemp.fastPathTemp(path.resolve('foo.txt')), path.resolve(`foo.txt_tmp_${process.pid}_${workerThreads.threadId}`))
})
