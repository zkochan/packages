'use strict'
const path = require('path')
const pathExists = require('path-exists')
const whichPM = require('which-pm')

module.exports = async function preferredPM (pkgPath) {
  if (typeof pkgPath !== 'string') {
    throw new TypeError(`pkgPath should be a string, got ${typeof pkgPath}`)
  }
  if (await pathExists(path.join(pkgPath, 'package-lock.json'))) {
    return {
      name: 'npm',
      version: '>=5'
    }
  }
  if (await pathExists(path.join(pkgPath, 'yarn.lock'))) {
    return {
      name: 'yarn',
      version: '*'
    }
  }
  if (await pathExists(path.join(pkgPath, 'pnpm-lock.yaml'))) {
    return {
      name: 'pnpm',
      version: '>=3'
    }
  }
  if (await pathExists(path.join(pkgPath, 'shrinkwrap.yaml'))) {
    return {
      name: 'pnpm',
      version: '1 || 2'
    }
  }
  const pm = await whichPM(pkgPath)
  return pm && { name: pm.name, version: pm.version || '*' }
}
