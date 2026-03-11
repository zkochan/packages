import fs from 'node:fs'

export async function rimraf (p) {
  try {
    await fs.promises.rm(p, { recursive: true, force: true, maxRetries: 3 })
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
}

export function rimrafSync (p) {
  try {
    fs.rmSync(p, { recursive: true, force: true, maxRetries: 3 })
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
}
