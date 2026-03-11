import { test, beforeEach } from 'node:test'
import assert from 'node:assert'
import { stripIndent } from 'common-tags'
import { renderHelp } from '../lib/index.js'

const originalColumns = process.stdout.columns

beforeEach(() => {
  process.stdout.columns = originalColumns
})

test('single usage', () => {
  const output = renderHelp({ usages: ['foo [command] [options]'] })
  assert.strictEqual(output, 'Usage: foo [command] [options]')
})

test('multiple usages', () => {
  const output = renderHelp({
    usages: [
      'foo [command] [options]',
      'foo --version',
    ],
  })
  assert.strictEqual(output, stripIndent`
    Usage: foo [command] [options]
           foo --version
  `)
})

test('single usage with description', () => {
  const output = renderHelp({
    description: 'Lorem ipsum.',
    usages: ['foo [command] [options]'],
  })
  assert.strictEqual(output, stripIndent`
    Usage: foo [command] [options]

    Lorem ipsum.
  `)
})

test('one alias', () => {
  const output = renderHelp({ aliases: ['f'], usages: ['foo [command] [options]'] })
  assert.strictEqual(output, stripIndent`
  Usage: foo [command] [options]

  Alias: f
  `)
})

test('two aliases', () => {
  const output = renderHelp({ aliases: ['f', 'fo'], usages: ['foo [command] [options]'] })
  assert.strictEqual(output, stripIndent`
    Usage: foo [command] [options]

    Aliases: f, fo
  `)
})

test('description list', () => {
  const output = renderHelp({
    descriptionLists: [
      {
        title: 'Options',
        list: [
          {
            description: 'This forces something',
            name: '--force',
            shortAlias: '-f',
          },
          {
            description: 'Bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar',
            name: '--bar'
          },
          {
            name: '--qar'
          }
        ]
      },
      {
        title: 'Commands',
        list: [
          {
            description: 'Foo',
            name: 'foo',
            shortAlias: 'f'
          }
        ]
      },
      {
        title: 'Basic',
        list: [
          {
            name: '--boo'
          },
          {
            description: 'Description',
            name: '--workspace-concurrency'
          }
        ]
      }
    ],
    usages: ['foo [command] [options]'],
    width: 1000,
  })
  assert.strictEqual(output, stripIndent`
    Usage: foo [command] [options]

    Options:
          --bar                Bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar
      -f, --force              This forces something
          --qar

    Commands:
       f, foo                  Foo

    Basic:
          --boo
          --workspace-concurrency  Description
  `)
})

test('description list should fit the screen', () => {
  const output = renderHelp({
    descriptionLists: [
      {
        title: 'Options',
        list: [
          {
            description: 'This forces something',
            name: '--force',
            shortAlias: '-f',
          },
          {
            description: 'Bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar',
            name: '--bar'
          },
          {
            name: '--qar'
          }
        ]
      },
      {
        title: 'Options 2',
        list: [
          {
            description: 'Bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar',
            name: '--bar'
          }
        ]
      },
    ],
    usages: ['foo [command] [options]'],
    width: 100,
  })
  assert.strictEqual(output, stripIndent`
    Usage: foo [command] [options]

    Options:
          --bar                Bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar
                               bar bar bar bar bar bar bar bar bar bar
      -f, --force              This forces something
          --qar

    Options 2:
          --bar                Bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar bar
                               bar bar bar bar bar bar bar bar bar bar
  `)
})

test('URL in the footer', () => {
  const output = renderHelp({ aliases: ['f', 'fo'], usages: ['foo [command] [options]'], url: 'https://example.com/' })
  assert.strictEqual(output, stripIndent`
    Usage: foo [command] [options]

    Aliases: f, fo

    Visit https://example.com/ for documentation about this command.
  `)
})

test('console width is very narrow', () => {
  process.stdout.columns = 5
  const output = renderHelp({
    descriptionLists: [
      {
        title: 'Options',
        list: [
          {
            name: '--qar'
          }
        ]
      },
    ],
    usages: ['foo [command] [options]'],
  })
  assert.strictEqual(output, stripIndent`
    Usage: foo [command] [options]

    Options:
          --qar
  `)
})
