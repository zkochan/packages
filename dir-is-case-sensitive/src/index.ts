import fs = require('graceful-fs')
import pathTemp = require('path-temp')

export default async (dir: string, silent: boolean = true): Promise<boolean | undefined> => {
  const tempFile = pathTemp(dir).toLowerCase()
  return new Promise((resolve, reject) => {
    fs.writeFile(tempFile, '', 'UTF8', (err) => {
      if (err) {
        if (silent) {
          resolve(undefined)
        } else {
          reject(err)
        }
        return
      }
      fs.stat(tempFile.toUpperCase(), (err) => {
        // The temp file is removed
        fs.unlink(tempFile, (err) => {
          // Errors are ignored
        })
        if (!err) {
          // If the file in different casing is FOUND,
          // then the directory is case insensitive
          resolve(false)
          return
        }
        if (err.code === 'ENOENT') {
          // If the file in different casing is NOT FOUND,
          // then the directory is case sensitive
          resolve(true)
          return
        }
        if (silent) {
          resolve(undefined)
        } else {
          reject(err)
        }
      })
    })
  })
}
