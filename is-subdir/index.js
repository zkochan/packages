'use strict'
const betterPathResolve = require('better-path-resolve')

module.exports = function (parent, dir) {
  const rParent = betterPathResolve(parent)
  const rDir = betterPathResolve(dir)
  return rDir.startsWith(rParent)
}
