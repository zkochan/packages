import path from 'node:path'
import { isSubdir } from 'is-subdir'
import { resolveLinkTarget } from 'resolve-link-target'

export async function isInnerLink (parent, relativePathToLink) {
  const linkPath = path.resolve(parent, relativePathToLink)
  const target = await resolveLinkTarget(linkPath)
  return {
    isInner: isSubdir(parent, target),
    target
  }
}
