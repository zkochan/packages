import fs from 'node:fs'
import path from 'node:path'

export async function resolveLinkTarget (linkPath) {
  linkPath = path.resolve(linkPath)
  const target = await fs.promises.readlink(linkPath)
  return _resolveLink(linkPath, target)
}

export function resolveLinkTargetSync (linkPath) {
  linkPath = path.resolve(linkPath)
  const target = fs.readlinkSync(linkPath)
  return _resolveLink(linkPath, target)
}

function _resolveLink (dest, target) {
  if (path.isAbsolute(target)) {
    return path.resolve(target)
  }

  return path.join(path.dirname(dest), target)
}
