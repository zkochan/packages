import defaultFS from 'node:fs'
import { pathTemp } from 'path-temp'

export async function canWriteToDir (dir, customFS) {
  const fs = customFS || defaultFS
  const tempFile = pathTemp(dir)
  try {
    await fs.promises.writeFile(tempFile, '', 'utf8')
    fs.promises.unlink(tempFile).catch(() => {})
    return true
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM' || err.code === 'EROFS') {
      return false
    }
    throw err
  }
}

export function canWriteToDirSync (dir, customFS) {
  const fs = customFS || defaultFS
  const tempFile = pathTemp(dir)
  try {
    fs.writeFileSync(tempFile, '', 'utf8')
    fs.unlinkSync(tempFile)
    return true
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM' || err.code === 'EROFS') {
      return false
    }
    throw err
  }
}
