import { stripIndent } from 'common-tags'
import helpOutput from '../src'

test('single usage', () => {
    const output = helpOutput({ usages: ['foo [command] [options]'] })
    expect(output).toBe('Usage: foo [command] [options]')
})

test('multiple usages', () => {
    const output = helpOutput({
        usages: [
            'foo [command] [options]',
            'foo --version',
        ] })
    expect(output).toBe(stripIndent`
      Usage: foo [command] [options]
             foo --version
    `)
})

test('single usage with description', () => {
    const output = helpOutput({
        description: 'Lorem ipsum.',
        usages: ['foo [command] [options]'],
    })
    expect(output).toBe(stripIndent`
      Usage: foo [command] [options]
      
      Lorem ipsum.
    `)
})

test('one alias', () => {
    const output = helpOutput({ aliases: ['f'], usages: ['foo [command] [options]'] })
    expect(output).toBe(stripIndent`
        Usage: foo [command] [options]

        Alias: f
    `)
})

test('two aliases', () => {
    const output = helpOutput({ aliases: ['f', 'fo'], usages: ['foo [command] [options]'] })
    expect(output).toBe(stripIndent`
        Usage: foo [command] [options]

        Aliases: f, fo
    `)
})

test('description list', () => {
    const output = helpOutput({
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
                        description: 'Bar',
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
            }
        ],
        usages: ['foo [command] [options]'],
    })
    expect(output).toBe(stripIndent`
        Usage: foo [command] [options]

        Options:
              --bar    Bar
          -f, --force  This forces something
              --qar
        
        Commands:
          f, foo  Foo
    `)
})
