'use strict'
const path = require('path')
const canLink = require('can-link')
const pathTemp = require('path-temp')

module.exports = async function findLinkableDir (filePath) {
  const abs = path.resolve(filePath)
  const end = path.dirname(abs)
  for (const dir of dirsFromRootToEnd(end)) {
    if (await canLink(abs, pathTemp(dir))) return dir
  }
  throw new Error(`${abs} cannot be linked to anywhere`)
}

module.exports.sync = function findLinkableDirSync (filePath) {
  const abs = path.resolve(filePath)
  const end = path.dirname(abs)
  for (const dir of dirsFromRootToEnd(end)) {
    if (canLink.sync(abs, pathTemp(dir))) return dir
  }
  throw new Error(`${abs} cannot be linked to anywhere`)
}

function dirsFromRootToEnd (end) {
  const root = path.parse(end).root
  const rel = path.relative(root, end)
  const segments = rel ? rel.split(path.sep).filter(Boolean) : []
  const dirs = [root]
  let cur = root
  for (const seg of segments) {
    cur = path.join(cur, seg)
    dirs.push(cur)
  }
  return dirs
}
