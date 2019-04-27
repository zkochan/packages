'use strict'
const path = require('path')
const fs = require('graceful-fs')
const stripBom = require('strip-bom')
const JSON5 = require('json5')
const pify = require('pify')

const parse = (data, fp) => JSON5.parse(stripBom(data), path.relative('.', fp))

module.exports = fp => pify(fs.readFile)(fp, 'utf8').then(data => parse(data, fp))
module.exports.sync = fp => parse(fs.readFileSync(fp, 'utf8'), fp)
