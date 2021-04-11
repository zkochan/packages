'use strict'
const fs = require('fs')
const path = require('path')
const rimraf = require('@zkochan/rimraf')

module.exports = async function renameOverwrite (oldPath, newPath) {
  try {
    await fs.promises.rename(oldPath, newPath)
  } catch (err) {
    switch (err.code) {
      case 'ENOTEMPTY':
      case 'EEXIST':
        await rimraf(newPath)
        await renameOverwrite(oldPath, newPath)
        break
      // Windows Antivirus issues
      case 'EPERM':
      case 'EACCESS': {
        await rimraf(newPath)
        const start = Date.now()
        let backoff = 0
        let lastError = err
        while (Date.now() - start < 60000 && (lastError.code === 'EPERM' || lastError.code === 'EACCESS')) {
          await new Promise(resolve => setTimeout(resolve, backoff))
          try {
            await fs.promises.rename(oldPath, newPath)
            return
          } catch (err) {
            lastError = err
          }
          if (backoff < 100) {
            backoff += 10
          }
        }
        throw lastError
      }
      case 'ENOENT':
        try {
          await fs.promises.stat(oldPath)
        } catch (statErr) {
          // If the source file does not exist, we cannot possible rename it
          if (statErr.code === 'ENOENT') {
            throw statErr
          }
        }
        await fs.promises.mkdir(path.dirname(newPath), { recursive: true })
        await renameOverwrite(oldPath, newPath)
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
        rimraf.sync(newPath)
        fs.renameSync(oldPath, newPath)
        return
      case 'ENOENT':
        fs.mkdirSync(path.dirname(newPath), { recursive: true })
        renameOverwriteSync(oldPath, newPath)
        return
      default:
        throw err
    }
  }
}
