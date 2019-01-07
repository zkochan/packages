import delay from 'delay'
import runGroups from 'run-groups'
import test = require('tape')

test('runGroups()', async (t) => {
  t.plan(4)
  let group2Executed = false
  await runGroups(2, [
    [
      async () => {
        await delay(100)
        t.notOk(group2Executed)
      },
      async () => {
        await delay(50)
        t.notOk(group2Executed)
      },
    ],
    [
      async () => {
        group2Executed = true
        await delay(100)
        t.pass()
      },
      async () => {
        group2Executed = true
        await delay(50)
        t.pass()
      },
    ]
  ])
  t.end()
})
