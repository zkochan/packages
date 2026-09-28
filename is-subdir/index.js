import { betterPathResolve } from 'better-path-resolve'
import path from 'node:path'

export function isSubdir (parentDir, subdir) {
  const rParent = resolveWithTrailingSep(parentDir)
  const rDir = resolveWithTrailingSep(subdir)
  return rDir.startsWith(rParent)
}

export function strict (parentDir, subdir) {
  const rParent = resolveWithTrailingSep(parentDir)
  const rDir = resolveWithTrailingSep(subdir)
  return rDir !== rParent && rDir.startsWith(rParent)
}

// A filesystem root such as "/" or "C:\" already ends with a separator.
function resolveWithTrailingSep (dir) {
  const resolved = betterPathResolve(dir)
  return resolved.endsWith(path.sep) ? resolved : `${resolved}${path.sep}`
}
