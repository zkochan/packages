import { whichPMRuns } from '../../../index.js'

const pm = whichPMRuns()
if (pm.name !== 'npm' || !pm.version) process.exit(1)
