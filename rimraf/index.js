const { rimraf } = require('rimraf')

module.exports = async (p) => {
  try {
    await rimraf(p)
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
