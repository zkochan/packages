import { fileURLToPath } from 'node:url'
import which from '@zkochan/which'
import { execa, execaSync } from 'execa'
import type { Options, SyncOptions, ResultPromise, SyncResult } from 'execa'
import PATH from 'path-name'

export type { Options, SyncOptions, ResultPromise, SyncResult }

const pathCache = new Map<string, string | undefined>()

function cwdToString (cwd: string | URL | undefined): string {
  if (cwd == null) return process.cwd()
  if (cwd instanceof URL) return fileURLToPath(cwd)
  return cwd
}

export function	sync (
  file: string,
  args?: readonly string[],
  options?: SyncOptions
): SyncResult {
  const normalizedArgs = args ? [...args] : []
  try {
    which.sync(file, { path: cwdToString(options?.cwd) })
  } catch (err: any) {
    // If the command is not found in the current directory, there is no need to resolve the command to full location
    // as there is no danger of binary planting attack on Windows
    if (err.code === 'ENOENT') {
      return execaSync(file, normalizedArgs, options)
    }
  }
  const fileAbsolutePath = getCommandAbsolutePathSync(file, options)
  return execaSync(fileAbsolutePath, normalizedArgs, options)
}

function getCommandAbsolutePathSync (file: string, options?: {
		readonly env?: NodeJS.ProcessEnv;
}) {
  if (file.includes('\\') || file.includes('/')) return file
  const path = options?.env?.[PATH] ?? process.env[PATH]
  const key = JSON.stringify([path, file])
  let fileAbsolutePath = pathCache.get(key)
  if (fileAbsolutePath == null) {
    fileAbsolutePath = which.sync(file, { path })
    pathCache.set(key, fileAbsolutePath)
  }
  if (fileAbsolutePath == null) {
    throw new Error(`Couldn't find ${file}`)
  }
  return fileAbsolutePath
}

export function safeExeca (
  file: string,
  args?: readonly string[],
  options?: Options
): ResultPromise {
  const normalizedArgs = args ? [...args] : []
  try {
    which.sync(file, { path: cwdToString(options?.cwd) })
  } catch (err: any) {
    // If the command is not found in the current directory, there is no need to resolve the command to full location
    // as there is no danger of binary planting attack on Windows
    if (err.code === 'ENOENT') {
      return execa(file, normalizedArgs, options)
    }
  }
  const fileAbsolutePath = getCommandAbsolutePathSync(file, options)
  return execa(fileAbsolutePath, normalizedArgs, options)
}
