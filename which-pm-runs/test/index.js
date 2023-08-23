'use strict'
const test = require('tape')
const execa = require('execa')
const path = require('path')

delete process.env.npm_config_user_agent

const fixturesDir = path.join(__dirname, 'fixtures')

test('detects yarn', t => {
  execa('yarn', [], { cwd: path.join(fixturesDir, 'yarn') })
    .then(() => t.end())
    .catch(t.end)
})

test('detects bun', t => {
  execa('bun', ['install'], { cwd: path.join(fixturesDir, 'bun') })
    .then(() => t.end())
    .catch(t.end)
})

test('detects npm', t => {
  execa('npm', ['install'], { cwd: path.join(fixturesDir, 'npm') })
    .then(() => t.end())
    .catch(t.end)
})

test('detects pnpm', t => {
  execa('pnpm', ['install'], { cwd: path.join(fixturesDir, 'pnpm') })
    .then(() => t.end())
    .catch(t.end)
})

test('detects cnpm', t => {
  execa('cnpm', ['install'], { cwd: path.join(fixturesDir, 'cnpm') })
    .then(() => t.end())
    .catch(t.end)
})
