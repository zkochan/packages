'use strict'
const canLink = require('can-link')
const path = require('path')
const pathTemp = require('path-temp')
const nextPath = require('next-path')

module.exports = async (filePath) => {
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

module.exports.sync = (filePath) => {
  filePath = path.resolve(filePath)
  const end = path.dirname(filePath)
  let dir = path.parse(end).root

  while (true) {
    const result = canLink.sync(filePath, pathTemp(dir))
    if (result) {
      return dir
    } else if (dir === end) {
      throw new Error(`${filePath} cannot be linked to anywhere`)
    } else {
      dir = nextPath(dir, end)
    }
  }
}
