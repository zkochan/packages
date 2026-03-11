import { whichPMRuns } from '../../../index.js'

const pm = whichPMRuns()
if (pm.name !== 'yarn' || !pm.version) process.exit(1)
