const { promisify } = require('util')

module.exports = promisify(require('rimraf'))
