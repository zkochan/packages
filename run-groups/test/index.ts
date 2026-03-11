import { test } from 'node:test'
import assert from 'node:assert'
import delay from 'delay'
import { runGroups } from 'run-groups'

test('runGroups()', async () => {
  let group2Executed = false
  await runGroups(2, [
    [
      async () => {
        await delay(100)
        assert.ok(!group2Executed)
      },
      async () => {
        await delay(50)
        assert.ok(!group2Executed)
      },
    ],
    [
      async () => {
        group2Executed = true
        await delay(100)
      },
      async () => {
        group2Executed = true
        await delay(50)
      },
    ]
  ])
})
