'use strict'
const whichpm = require('.')

whichpm(process.cwd()).then(pm => console.log(pm)).catch(err => console.error(err))
