const fs = require('fs')
const cp = require('child_process')
const semverSatisfies = require('semver/functions/satisfies')

// Run package tests that only matches the current node version via `engines.node`

const nodeVersion = process.version.slice(1)
const filteredPackageNames = []

const files = fs.readdirSync(__dirname)
for (const file of files) {
  try {
    const pkg = require(`./${file}/package.json`)
    if (pkg.engines && pkg.engines.node) {
      if (semverSatisfies(nodeVersion, pkg.engines.node)) {
        filteredPackageNames.push(pkg.name)
      } else {
        console.log(`Skipping ${pkg.name} because it requires node ${pkg.engines.node}`)
      }
    } else {
      filteredPackageNames.push(pkg.name)
    }
  } catch {}
}

cp.spawnSync(
  'pnpm',
  [
    ...filteredPackageNames.map((name) => `--filter=${name}`),
    '--no-bail',
    'test'
  ],
  { stdio: 'inherit' }
)
