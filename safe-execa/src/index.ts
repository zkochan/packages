import which from '@zkochan/which'
import execa from 'execa'
import PATH from 'path-name'

const pathCache = new Map<string, string | undefined>()

export function	sync (
  file: string,
  args?: readonly string[],
  options?: execa.SyncOptions
): execa.ExecaSyncReturnValue {
  const fileAbsolutePath = getCommandAbsolutePathSync(file, options)
  return execa.sync(fileAbsolutePath, args, options)
}

function getCommandAbsolutePathSync (file: string, options?: {
		readonly env?: NodeJS.ProcessEnv;
}) {
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

export default async function (
  file: string,
  args?: readonly string[],
  options?: execa.Options
) {
  const fileAbsolutePath = await getCommandAbsolutePath(file, options)
  return execa(fileAbsolutePath, args, options)
}

async function getCommandAbsolutePath (file: string, options?: {
		readonly env?: NodeJS.ProcessEnv;
}) {
  const path = options?.env?.[PATH] ?? process.env[PATH]
  const key = JSON.stringify([path, file])
  let fileAbsolutePath = pathCache.get(key)
  if (fileAbsolutePath == null) {
    fileAbsolutePath = await which(file, { path })
    pathCache.set(key, fileAbsolutePath)
  }
  if (fileAbsolutePath == null) {
    throw new Error(`Couldn't find ${file}`)
  }
  return fileAbsolutePath
}
