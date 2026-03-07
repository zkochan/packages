'use strict'
const crypto = require('crypto')
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
        try {
          // Swap-rename avoids leaving a window where the target doesn't exist,
          // which is important when parallel processes read from the target.
          await swapRename(oldPath, newPath)
        } catch {
          // If swap-rename failed (e.g. target was already moved by another
          // process), fall back to rimraf + rename.
          await rimraf(newPath)
          await fs.promises.rename(oldPath, newPath)
        }
        break
      // Windows Antivirus issues
      case 'EPERM':
      case 'EACCESS':
      case 'EBUSY': {
        await rimraf(newPath)
        const start = Date.now()
        let backoff = 0
        let lastError = err
        while (Date.now() - start < 60000 && (lastError.code === 'EPERM' || lastError.code === 'EACCESS' || lastError.code === 'EBUSY')) {
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
      case 'EACCESS':
      case 'EBUSY': {
        rimraf.sync(newPath)
        const start = Date.now()
        let backoff = 0
        let lastError = err
        while (Date.now() - start < 60000 && (lastError.code === 'EPERM' || lastError.code === 'EACCESS' || lastError.code === 'EBUSY')) {
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
        try {
          // Swap-rename avoids leaving a window where the target doesn't exist,
          // which is important when parallel processes read from the target.
          swapRenameSync(oldPath, newPath)
        } catch {
          // If swap-rename failed (e.g. target was already moved by another
          // process), fall back to rimraf + rename.
          rimraf.sync(newPath)
          fs.renameSync(oldPath, newPath)
        }
        break
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

function tempPath (p) {
  return `${p}_${process.pid.toString(16)}_${crypto.randomBytes(4).toString('hex')}`
}

// Rename the target aside before replacing it. This minimizes the window where
// the target doesn't exist, which is critical when parallel processes may be
// reading from the target (e.g. pnpm's global virtual store).
async function swapRename (oldPath, newPath) {
  const temp = tempPath(newPath)
  await fs.promises.rename(newPath, temp)
  try {
    await fs.promises.rename(oldPath, newPath)
  } catch (err) {
    try {
      await fs.promises.rename(temp, newPath)
    } catch {}
    throw err
  }
  rimraf(temp).catch(() => {})
}

function swapRenameSync (oldPath, newPath) {
  const temp = tempPath(newPath)
  fs.renameSync(newPath, temp)
  try {
    fs.renameSync(oldPath, newPath)
  } catch (err) {
    try {
      fs.renameSync(temp, newPath)
    } catch {}
    throw err
  }
  try {
    rimraf.sync(temp)
  } catch {}
}