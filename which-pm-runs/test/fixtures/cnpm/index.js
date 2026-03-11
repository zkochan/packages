import { whichPMRuns } from '../../../index.js'

const pm = whichPMRuns()
if (pm.name !== 'cnpm' || !pm.version) process.exit(1)
