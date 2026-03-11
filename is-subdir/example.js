import path from 'node:path'
import { isSubdir } from './index.js'

console.log(isSubdir(process.cwd(), path.resolve('node_modules')))
