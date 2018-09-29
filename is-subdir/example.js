'use strict'
const path = require('path')
const isSubdir = require('.')

console.log(isSubdir(process.cwd(), path.resolve('node_modules')))
