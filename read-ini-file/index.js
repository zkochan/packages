'use strict'
const fs = require('fs')
const stripBom = require('strip-bom')
const ini = require('ini')

const parse = (data) => ini.parse(stripBom(data))

module.exports.readIniFile = async function (fp) {
  const data = await fs.promises.readFile(fp, 'utf8')
  return parse(data)
}

module.exports.readIniFileSync = fp => parse(fs.readFileSync(fp, 'utf8'))
