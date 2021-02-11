'use strict'
const fs = require('fs')
const stripBom = require('strip-bom')
const ini = require('ini')

const parse = (data) => ini.parse(stripBom(data))

module.exports = fp => fs.promises.readFile(fp, 'utf8').then(parse)
module.exports.sync = fp => parse(fs.readFileSync(fp, 'utf8'))
