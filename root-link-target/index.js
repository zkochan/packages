import { canLink, canLinkSync } from 'can-link'
import path from 'node:path'
import { pathTemp } from 'path-temp'
import nextPath from 'next-path'

export async function rootLinkTarget (filePath) {
  filePath = path.resolve(filePath)
  const end = path.dirname(filePath)
  let dir = path.parse(end).root

  while (true) {
    const result = await canLink(filePath, pathTemp(dir))
    if (result) {
      return dir
    } else if (dir === end) {
      throw new Error(`${filePath} cannot be linked to anywhere`)
    } else {
      dir = nextPath(dir, end)
    }
  }
}

export function rootLinkTargetSync (filePath) {
  filePath = path.resolve(filePath)
  const end = path.dirname(filePath)
  let dir = path.parse(end).root

  while (true) {
    const result = canLinkSync(filePath, pathTemp(dir))
    if (result) {
      return dir
    } else if (dir === end) {
      throw new Error(`${filePath} cannot be linked to anywhere`)
    } else {
      dir = nextPath(dir, end)
    }
  }
}
