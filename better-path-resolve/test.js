'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const betterPathResolve = require('.')

test('betterPathResolve()', () => {
  assert.strictEqual(typeof betterPathResolve(), 'string')
})
