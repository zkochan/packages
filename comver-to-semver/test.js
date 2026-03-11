'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const comverToSemver = require('.')

test('comverToSemver()', () => {
  assert.strictEqual(comverToSemver('2'), '2.0.0')
  assert.strictEqual(comverToSemver('2.1'), '2.1.0')
})
