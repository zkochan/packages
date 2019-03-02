'use strict'
const path = require('path')
const isSubdir = require('is-subdir')
const resolveLinkTarget = require('resolve-link-target')

module.exports = async function (parent, relativePathToLink) {
  const linkPath = path.resolve(parent, relativePathToLink)
  const target = await resolveLinkTarget(linkPath)
  return {
    isInner: isSubdir(parent, target),
    target
  }
}
