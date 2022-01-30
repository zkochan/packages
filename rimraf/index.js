const rimraf = require('rimraf')
const { promisify } = require('util')

const rimrafP = promisify(rimraf)

module.exports = async (p) => {
  try {
    await rimrafP(p)
  } catch (err) {
    if (err.code === 'ENOTDIR' || err.code === 'ENOENT') return
    throw err
  }
}

module.exports.sync = (p) => {
  try {
    rimraf.sync(p)
  } catch (err) {
    if (err.code === 'ENOTDIR' || err.code === 'ENOENT') return
    throw err
  }
}
