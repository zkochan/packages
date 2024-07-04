const path = require('path')
const fs = require('fs')
const tempy = require('tempy')
const rimraf = require('..')

test('rimraf', async () => {
  const dir = tempy.directory()
  fs.writeFileSync(path.join(dir, 'file.txt'), 'foo', 'utf8')
  expect(fs.existsSync(dir)).toBe(true)
  await rimraf(dir)
  expect(fs.existsSync(dir)).toBe(false)
})

test('rimraf sync', () => {
  const dir = tempy.directory()
  fs.writeFileSync(path.join(dir, 'file.txt'), 'foo', 'utf8')
  expect(fs.existsSync(dir)).toBe(true)
  rimraf.sync(dir)
  expect(fs.existsSync(dir)).toBe(false)
})
