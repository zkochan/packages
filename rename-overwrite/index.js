'use strict'
const fs = require('fs')
const { copySync, copy } = require('fs-extra')
const path = require('path')
const rimraf = require('@zkochan/rimraf')

module.exports = async function renameOverwrite (oldPath, newPath, retry = 0) {
  try {
    await fs.promises.rename(oldPath, newPath)
  } catch (err) {
    retry++
    if (retry > 3) throw err
    switch (err.code) {
      case 'ENOTEMPTY':
      case 'EEXIST':
      case 'ENOTDIR':
        await rimraf(newPath)
        await renameOverwrite(oldPath, newPath, retry)
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
        await renameOverwrite(oldPath, newPath, retry)
        break
      // Crossing filesystem boundaries so rename is not available
      case 'EXDEV':
        try {
          await rimraf(newPath)
        } catch (rimrafErr) {
          if (rimrafErr.code !== 'ENOENT') {
            throw rimrafErr
          }
        }
        await copy(oldPath, newPath)
        await rimraf(oldPath)
        break
      default:
        throw err
    }
  }
}

module.exports.sync = function renameOverwriteSync (oldPath, newPath, retry = 0) {
  try {
    fs.renameSync(oldPath, newPath)
  } catch (err) {
    retry++
    if (retry > 3) throw err
    switch (err.code) {
      // Windows Antivirus issues
      case 'EPERM':
      case 'EACCESS': {
        rimraf.sync(newPath)
        const start = Date.now()
        let backoff = 0
        let lastError = err
        while (Date.now() - start < 60000 && (lastError.code === 'EPERM' || lastError.code === 'EACCESS')) {
          const waitUntil = Date.now() + backoff
          while (waitUntil > Date.now()) {}
          try {
            fs.renameSync(oldPath, newPath)
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
      case 'ENOTEMPTY':
      case 'EEXIST':
      case 'ENOTDIR':
        rimraf.sync(newPath)
        fs.renameSync(oldPath, newPath)
        return
      case 'ENOENT':
        fs.mkdirSync(path.dirname(newPath), { recursive: true })
        renameOverwriteSync(oldPath, newPath, retry)
        return
      // Crossing filesystem boundaries so rename is not available
      case 'EXDEV':
        try {
          rimraf.sync(newPath)
        } catch (rimrafErr) {
          if (rimrafErr.code !== 'ENOENT') {
            throw rimrafErr
          }
        }
        copySync(oldPath, newPath)
        rimraf.sync(oldPath)
        break
      default:
        throw err
    }
  }
}
