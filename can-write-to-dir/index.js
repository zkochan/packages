'use strict'
const gracefulFs = require('graceful-fs')
const pathTemp = require('path-temp')

module.exports = (dir, customFs) => {
  const fs = customFs || gracefulFs
  return new Promise((resolve, reject) => {
    const tempFile = pathTemp(dir)
    fs.writeFile(tempFile, '', 'utf8', err => {
      if (!err) {
        fs.unlink(tempFile, () => {})
        resolve(true)
        return
      }
      if (err.code === 'EACCES' || err.code === 'EPERM' || err.code === 'EROFS') {
        resolve(false)
        return
      }
      reject(err)
    })
  })
}

module.exports.sync = (dir, customFs) => {
  const fs = customFs || gracefulFs
  const tempFile = pathTemp(dir)
  try {
    fs.writeFileSync(tempFile, '', 'utf8')
    fs.unlinkSync(tempFile)
    return true
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM') {
      return false
    }
    throw err
  }
}
