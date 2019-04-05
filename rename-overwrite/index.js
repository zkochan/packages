'use strict'
const fs = require('graceful-fs')
const promisify = require('util').promisify
const rimraf = promisify(require('rimraf'))
const rimrafSync = require('rimraf').sync

const rename = promisify(fs.rename)

module.exports = async function renameOverwrite (oldPath, newPath) {
  try {
    await rename(oldPath, newPath)
  } catch (err) {
    switch (err.code) {
      case 'ENOTEMPTY':
      case 'EEXIST':
        await rimraf(newPath)
        await rename(oldPath, newPath)
        break
      // weird Windows stuff
      case 'EPERM':
        await new Promise(resolve => setTimeout(resolve, 200))
        await rimraf(newPath)
        await rename(oldPath, newPath)
        break
      default:
        throw err
    }
  }
}

module.exports.sync = function renameOverwriteSync (oldPath, newPath) {
  try {
    fs.renameSync(oldPath, newPath)
  } catch (err) {
    switch (err.code) {
      case 'ENOTEMPTY':
      case 'EEXIST':
      case 'EPERM': // weird Windows stuff
        rimrafSync(newPath)
        fs.renameSync(oldPath, newPath)
        return
      default:
        throw err
    }
  }
}
