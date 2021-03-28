const { promises: fs } = require('fs')

module.exports = async (p) => {
  try {
    await fs.rmdir(p, { recursive: true, maxRetries: 3 })
  } catch (err) {
    if (err.code === 'ENOTDIR' || err.code === 'ENOENT') return
    throw err
  }
}
