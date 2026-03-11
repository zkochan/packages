import path from 'node:path'
import { test } from 'node:test'
import assert from 'node:assert'
import { threadId } from 'node:worker_threads'
import { pathTemp, fastPathTemp } from 'path-temp'

test('pathTemp', () => {
  assert.strictEqual(typeof pathTemp(process.cwd()), 'string')
})

test('fastPathTemp', () => {
  assert.strictEqual(fastPathTemp(path.resolve('foo.txt')), path.resolve(`foo.txt_tmp_${process.pid}_${threadId}`))
})
