'use strict'
const fs = require('graceful-fs')
const path = require('path')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))

const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)

module.exports = async function makeEmptyDir (dir, opts) {
  if (opts && opts.recursive) {
    await mkdir(path.dirname(dir), { recursive: true })
  }
  try {
    await mkdir(dir)
    return 'created'
  } catch (err) {
    if (err.code === 'EEXIST') {
      await removeContentsOfDir(dir)
      return 'emptied'
    }
    throw err
  }
}

async function removeContentsOfDir (dir) {
  const items = await readdir(dir)
  for (const item of items) {
    await rimraf(path.join(dir, item))
  }
}
