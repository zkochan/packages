import { whichPMRuns } from '../../../index.js'

const pm = whichPMRuns();
if (pm.name !== 'bun' || !pm.version) process.exit(1)
