'use strict'
const loadIniFile = require('..')
const path = require('path')

const fixture = path.join(__dirname, 'currencies.ini')
const currencies = loadIniFile.sync(fixture)
console.log(currencies)
