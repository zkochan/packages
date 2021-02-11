'use strict'
const defaultFS = require('fs')

module.exports = async (existingPath, newPath, customFS) => {
  const fs = customFS || defaultFS
  try {
    await fs.promises.link(existingPath, newPath)
    fs.promises.unlink(newPath).catch(() => {})
    return true
  } catch (err) {
    if (
      err.code === 'EXDEV' ||
      err.code === 'EACCES' ||
      err.code === 'EPERM'
    ) {
      return false
    }
    throw err
  }
}

module.exports.sync = (existingPath, newPath, customFS) => {
  const fs = customFS || defaultFS
  try {
    fs.linkSync(existingPath, newPath)
    fs.unlinkSync(newPath)
    return true
  } catch (err) {
    if (err.code === 'EXDEV' || err.code === 'EACCES' || err.code === 'EPERM') {
      return false
    }
    throw err
  }
}
