'use strict'
const { test } = require('node:test')
const execa = require('execa')
const path = require('path')
const os = require('os')

delete process.env.npm_config_user_agent

const fixturesDir = path.join(__dirname, 'fixtures')

test('detects yarn', async () => {
  await execa('yarn', [], { cwd: path.join(fixturesDir, 'yarn') })
})

test('detects bun', { skip: os.platform() === 'win32' }, async () => {
  await execa('bun', ['install'], { cwd: path.join(fixturesDir, 'bun') })
})

test('detects npm', async () => {
  await execa('npm', ['install'], { cwd: path.join(fixturesDir, 'npm') })
})

test('detects pnpm', async () => {
  await execa('pnpm', ['install'], { cwd: path.join(fixturesDir, 'pnpm') })
})

test('detects cnpm', async () => {
  await execa('cnpm', ['install'], { cwd: path.join(fixturesDir, 'cnpm') })
})
