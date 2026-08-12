import path from 'node:path'
import fs from 'node:fs'
import { loadYamlFile } from 'load-yaml-file'

export async function whichPM (pkgPath) {
  //  priority 1: devEngines.packageManager field in package.json
  try {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgPath, 'package.json'), 'utf8'))
    if (pkgJson.devEngines?.packageManager) {
      return normalizeResult(pkgJson.devEngines.packageManager)
    }
  } catch (err) {
    // package.json does not exist or is invalid json — fall through
  }

  const modulesPath = path.join(pkgPath, 'node_modules')
  const exists = fs.existsSync(path.join(modulesPath, '.yarn-integrity'))
  if (exists) return { name: 'yarn' }

  try {
    const modules = await loadYamlFile(path.join(modulesPath, '.modules.yaml'))
    return toNameAndVersion(modules.packageManager)
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }

  if (fs.existsSync(path.join(pkgPath, 'bun.lockb'))) return { name: 'bun' }

  const modulesExists = fs.existsSync(modulesPath)
  return modulesExists ? { name: 'npm' } : null
}

function normalizeResult (result) {
  if (result.version != null) return result
  return { name: result.name }
}

function toNameAndVersion (pkgSpec) {
  if (pkgSpec[0] === '@') {
    const woPrefix = pkgSpec.substr(1)
    const parts = woPrefix.split('@')
    return {
      name: `@${parts[0]}`,
      version: parts[1]
    }
  }
  const parts = pkgSpec.split('@')
  return {
    name: parts[0],
    version: parts[1]
  }
}
