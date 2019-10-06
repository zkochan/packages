'use strict'
const betterPathResolve = require('better-path-resolve')
const path = require('path')

module.exports = function isSubdir (parent, dir) {
  const rParent = betterPathResolve(parent)
  const rDir = betterPathResolve(dir)
  return rDir.startsWith(`${rParent}${path.sep}`)
}
