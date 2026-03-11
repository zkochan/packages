import path from 'node:path'
import uniqueString from 'unique-string'
import { threadId } from 'node:worker_threads'

export function pathTemp (folder) {
  return path.join(folder, `_tmp_${process.pid}_${uniqueString()}`)
}

export function fastPathTemp (file) {
  return path.join(path.dirname(file), `${path.basename(file)}_tmp_${process.pid}_${threadId}`)
}
