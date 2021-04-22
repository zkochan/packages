const fs = require('fs')

const rm = fs.promises.rm ? fs.promises.rm : fs.promises.rmdir
const rmdirSync = fs.rmSync ? fs.rmSync : fs.rmdirSync

module.exports = async (p) => {
  try {
    await rm(p, { recursive: true, maxRetries: 3 })
  } catch (err) {
    if (err.code === 'ENOTDIR' || err.code === 'ENOENT') return
    throw err
  }
}

module.exports.sync = (p) => {
  try {
    rmdirSync(p, { recursive: true, maxRetries: 3 })
  } catch (err) {
    if (err.code === 'ENOTDIR' || err.code === 'ENOENT') return
    throw err
  }
}
