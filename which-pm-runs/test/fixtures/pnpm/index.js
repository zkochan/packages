import { whichPMRuns } from '../../../index.js'

const pm = whichPMRuns()
if (pm.name !== 'pnpm' || !pm.version) process.exit(1)
