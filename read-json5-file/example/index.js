'use strict'
const loadJson5File = require('..')
const path = require('path')

const fixture = path.join(__dirname, 'countries.json5')
const countries = loadJson5File.sync(fixture)
console.log(countries)
