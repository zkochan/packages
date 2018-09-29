'use strict'
const whichPmRuns = require('which-pm-runs')

const pm = whichPmRuns()
if (pm.name !== 'yarn' || !pm.version) process.exit(1)
