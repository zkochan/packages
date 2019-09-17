import renderHelp from './src'

const output = renderHelp({
  usages: ['pnpm install [options]'],
  aliases: ['i'],
  description: 'Install all dependencies',
  descriptionLists: [
    {
      title: 'Options',
      list: [
        {
          name: '-force',
          shortAlias: '-f',
          description: 'Do some dangerous things'
        }
      ]
    }
  ],
  url: 'https://pnpm.js.org/en/cli/install'
})
console.log(output)
