'use strict'
const fs = require('fs')
const path = require('path')

module.exports = getLinkTarget
module.exports.sync = getLinkTargetSync

async function getLinkTarget (linkPath) {
  linkPath = path.resolve(linkPath)
  const target = await fs.promises.readlink(linkPath)
  return _resolveLink(linkPath, target)
}

function getLinkTargetSync (linkPath) {
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
