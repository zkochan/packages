'use strict'
const path = require('path')
const pathTemp = require('path-temp')
const test = require('tape')

test('pathTemp', t => {
  t.equal(typeof pathTemp(process.cwd()), 'string')
  t.end()
})

test('fastPathTemp', t => {
  const workerThreads = require('node:worker_threads')
  t.equal(pathTemp.fastPathTemp(path.resolve('foo.txt')), path.resolve(`foo.txt_tmp_${process.pid}_${workerThreads.threadId}`))
  t.end()
})
