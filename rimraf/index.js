const fs = require('fs')

module.exports = async (p) => {
  try {
    await fs.promises.rm(p, { recursive: true, force: true, maxRetries: 3 })
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
}

module.exports.sync = (p) => {
  try {
    fs.rmSync(p, { recursive: true, force: true, maxRetries: 3 })
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
}
