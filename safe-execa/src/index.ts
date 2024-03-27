import which from '@zkochan/which'
import execa from 'execa'
import PATH from 'path-name'

export type { execa }

const pathCache = new Map<string, string | undefined>()

export function	sync (
  file: string,
  args?: readonly string[],
  options?: execa.SyncOptions
): execa.ExecaSyncReturnValue {
  try {
    which.sync(file, { path: options?.cwd ?? process.cwd() })
  } catch (err: any) {
    // If the command is not found in the current directory, there is no need to resolve the command to full location
    // as there is no danger of binary planting attack on Windows
    if (err.code === 'ENOENT') {
      return execa.sync(file, args, options)
    }
  }
  const fileAbsolutePath = getCommandAbsolutePathSync(file, options)
  return execa.sync(fileAbsolutePath, args, options)
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

export default function (
  file: string,
  args?: readonly string[],
  options?: execa.Options
): execa.ExecaChildProcess<string> {
  try {
    which.sync(file, { path: options?.cwd ?? process.cwd() })
  } catch (err: any) {
    // If the command is not found in the current directory, there is no need to resolve the command to full location
    // as there is no danger of binary planting attack on Windows
    if (err.code === 'ENOENT') {
      return execa(file, args, options)
    }
  }
  const fileAbsolutePath = getCommandAbsolutePathSync(file, options)
  return execa(fileAbsolutePath, args, options)
}
