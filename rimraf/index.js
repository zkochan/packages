const fs = require('fs')

module.exports = async (p) => {
  try {
    await fs.promises.rmdir(p, { recursive: true, force: true })
  } catch (err) {
    if (err.code === 'ENOTDIR' || err.code === 'ENOENT') return
    throw err
  }
}

module.exports.sync = (p) => {
  try {
    fs.rmdirSync(p, { recursive: true, force: true })
  } catch (err) {
    if (err.code === 'ENOTDIR' || err.code === 'ENOENT') return
    throw err
  }
}
