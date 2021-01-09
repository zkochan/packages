'use strict'

const fs = require('graceful-fs')
const stripBom = require('strip-bom')
const yaml = require('js-yaml')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

const parse = data => yaml.load(stripBom(data))

const readYamlFile = fp => readFile(fp, 'utf8').then(data => parse(data))

module.exports = readYamlFile
module.exports.default = readYamlFile
module.exports.sync = fp => parse(fs.readFileSync(fp, 'utf8'))
