'use strict'
const which = require('@zkochan/which');
const execa = require('execa')
const retry = require('retry')

let gitLocation

const RETRY_OPTIONS = {
  retries: 3,
  minTimeout: 1 * 1000,
  maxTimeout: 10 * 1000,
  randomize: true,
}

module.exports = async (args, opts) => {
  gitLocation = gitLocation || await which('git')
  opts = opts || {}
  const operation = retry.operation(Object.assign({}, RETRY_OPTIONS, opts))
  return new Promise((resolve, reject) => {
    operation.attempt(currentAttempt => {
      execa(gitLocation, args, {cwd: opts.cwd || process.cwd()})
        .then(resolve)
        .catch(err => {
          if (operation.retry(err)) {
            return
          }
          reject(operation.mainError())
        })
    })
  })
}
