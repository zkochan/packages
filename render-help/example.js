const renderHelp = require('./lib')

const output = renderHelp({
  usages: ['pnpm install [options]'],
  aliases: ['i'],
  description: 'Install all dependencies',
  descriptionLists: [
    {
      title: 'Options',
      list: [
        {
          name: '--force',
          shortAlias: '-f',
          description: 'Do some dangerous things'
        },
        {
          name: '--lockfile-only',
          description: "Don't create node_modules. Just generate pnpm-lock.yaml"
        }
      ]
    }
  ],
  url: 'https://pnpm.js.org/en/cli/install'
})
console.log(output)
