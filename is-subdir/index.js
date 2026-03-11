import { betterPathResolve } from 'better-path-resolve'
import path from 'node:path'

export function isSubdir (parentDir, subdir) {
  const rParent = `${betterPathResolve(parentDir)}${path.sep}`
  const rDir = `${betterPathResolve(subdir)}${path.sep}`
  return rDir.startsWith(rParent)
}

export function strict (parentDir, subdir) {
  const rParent = `${betterPathResolve(parentDir)}${path.sep}`
  const rDir = `${betterPathResolve(subdir)}${path.sep}`
  return rDir !== rParent && rDir.startsWith(rParent)
}
