import { promises as fs } from 'fs'
import pathTemp = require('path-temp')

export default async (dir: string, silent: boolean = true): Promise<boolean | undefined> => {
  const tempFile = pathTemp(dir).toLowerCase()
  try {
    await fs.writeFile(tempFile, '', 'utf8')
  } catch (err) {
    if (silent) {
      return
    }
    throw err
  }
  try {
    await fs.stat(tempFile.toUpperCase())
    // If the file in different casing is FOUND,
    // then the directory is case insensitive
    return false
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file in different casing is NOT FOUND,
      // then the directory is case sensitive
      return true
    }
    if (silent) {
      return
    }
    throw err
  } finally {
    // The temp file is removed
    fs.unlink(tempFile).catch((err) => {
      // Errors are ignored
    })
  }
}
