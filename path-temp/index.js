'use strict'
const path = require('path')
const uniqueString = require('unique-string')
const workerThreads = require('node:worker_threads')

module.exports = function pathTemp (folder) {
  return path.join(folder, `_tmp_${process.pid}_${uniqueString()}`)
}

module.exports.fastPathTemp = function pathTempFast (file) {
  return path.join(path.dirname(file), `${path.basename(file)}_tmp_${process.pid}_${workerThreads.threadId}`)
}
