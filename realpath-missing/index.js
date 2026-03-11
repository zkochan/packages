import fs from 'node:fs'

export async function realpathMissing (path) {
  try {
    return await fs.promises.realpath(path)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return path
    }
    throw err
  }
}
