'use strict'
const fs = require('graceful-fs')
const stripBom = require('strip-bom')
const ini = require('ini')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

const parse = (data) => ini.parse(stripBom(data))

module.exports = fp => readFile(fp, 'utf8').then(parse)
module.exports.sync = fp => parse(fs.readFileSync(fp, 'utf8'))
