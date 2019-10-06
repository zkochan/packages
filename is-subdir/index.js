'use strict'
const betterPathResolve = require('better-path-resolve')
const path = require('path')

module.exports = function isSubdir (parent, dir) {
  const rParent = `${betterPathResolve(parent)}${path.sep}`
  const rDir = `${betterPathResolve(dir)}${path.sep}`
  return rDir.startsWith(rParent)
}
