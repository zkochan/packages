'use strict'

const fs = require('fs')
const stripBom = require('strip-bom')
const yaml = require('yaml')

const parse = data => yaml.parse(stripBom(data))

const readYamlFile = fp => fs.promises.readFile(fp, 'utf8').then(data => parse(data))

module.exports = readYamlFile
module.exports.default = readYamlFile
module.exports.sync = fp => parse(fs.readFileSync(fp, 'utf8'))
