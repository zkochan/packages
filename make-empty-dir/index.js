'use strict'
const fs = require('fs').promises
const path = require('path')
const rimraf = require('@zkochan/rimraf')

module.exports = async function makeEmptyDir (dir, opts) {
  if (opts && opts.recursive) {
    await fs.mkdir(path.dirname(dir), { recursive: true })
  }
  try {
    await fs.mkdir(dir)
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
  const items = await fs.readdir(dir)
  for (const item of items) {
    await rimraf(path.join(dir, item))
  }
}
