import { whichPM } from './index.js'

whichPM(process.cwd()).then(pm => console.log(pm)).catch(err => console.error(err))
