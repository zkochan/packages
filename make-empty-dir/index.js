import fs from 'node:fs'
import path from 'node:path'
import { rimraf, rimrafSync } from '@zkochan/rimraf'

export async function makeEmptyDir (dir, opts) {
  if (opts && opts.recursive) {
    await fs.promises.mkdir(path.dirname(dir), { recursive: true })
  }
  try {
    await fs.promises.mkdir(dir)
    return 'created'
  } catch (err) {
    if (err.code === 'EEXIST') {
      await removeContentsOfDir(dir)
      return 'emptied'
    }
    throw err
  }
}

async function removeContentsOfDir (dir) {
  const items = await fs.promises.readdir(dir)
  for (const item of items) {
    await rimraf(path.join(dir, item))
  }
}

export function makeEmptyDirSync (dir, opts) {
  if (opts && opts.recursive) {
    fs.mkdirSync(path.dirname(dir), { recursive: true })
  }
  try {
    fs.mkdirSync(dir)
    return 'created'
  } catch (err) {
    if (err.code === 'EEXIST') {
      removeContentsOfDirSync(dir)
      return 'emptied'
    }
    throw err
  }
}

function removeContentsOfDirSync (dir) {
  const items = fs.readdirSync(dir)
  for (const item of items) {
    rimrafSync(path.join(dir, item))
  }
}
