import { test } from 'node:test'
import assert from 'node:assert'
import { readYamlFile, readYamlFileSync } from 'read-yaml-file'

test('readYamlFile()', async () => {
  const data = await readYamlFile('foo.yml')
  assert.deepStrictEqual(data, { foo: true })
})

test('readYamlFileSync()', () => {
  const data = readYamlFileSync('foo.yml')
  assert.deepStrictEqual(data, { foo: true })
})
