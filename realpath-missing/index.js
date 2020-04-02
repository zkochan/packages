const fs = require('graceful-fs')
const { promisify } = require('util')

const realpath = promisify(fs.realpath)

module.exports = async function realpathMissing (path) {
  try {
    return await realpath(path)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return path
    }
    throw err
  }
}

