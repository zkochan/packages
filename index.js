'use strict'
const path = require('path')
const pathExists = require('path-exists')
const loadYamlFile = require('load-yaml-file')

module.exports = function (pkgPath) {
  const modulesPath = path.join(pkgPath, 'node_modules')
  return pathExists(path.join(modulesPath, '.yarn-integrity'))
    .then(exists => {
      if (exists) return 'yarn'

      return loadYamlFile(path.join(modulesPath, '.modules.yaml'))
        .then(modules => modules.packageManager)
        .catch(err => {
          if (err.code !== 'ENOENT') throw err

          return pathExists(modulesPath)
            .then(modulesExists => {
              return modulesExists ? 'npm' : null
            })
        })
    })
}
