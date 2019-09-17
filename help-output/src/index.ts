import { table } from 'table'

const consoleWidth = process.stdout.columns || 80

type DescriptionItem = { shortAlias?: string, name: string, description?: string }

export default function renderHelp (
  config: {
    aliases?: string[],
    descriptionLists?: Array<{ title: string, list: DescriptionItem[] }>,
    description?: string,
    usages: string[],
    url?: string,
  }
) {
  let outputSections = []

  if (config.usages.length > 0) {
    const [firstUsage, ...restUsages] = config.usages
    let usageOutput = `Usage: ${firstUsage}`
    for (let usage of restUsages) {
      usageOutput += `\n       ${usage}`
    }
    outputSections.push(usageOutput)
  }
  if (config.aliases && config.aliases.length) {
    outputSections.push(`${config.aliases.length === 1 ? 'Alias' : 'Aliases'}: ${config.aliases.join(', ')}`)
  }
  if (config.description) outputSections.push(`${config.description}`)
  if (config.descriptionLists) {
    for (let { title, list } of config.descriptionLists) {
      outputSections.push(`${title}:\n` + renderDescriptionList(list))
    }
  }
  if (config.url) {
    outputSections.push(`Visit ${config.url} for documentation about this command.`)
  }
  return outputSections.join('\n\n')
}

const NO_BORDERS = {
  topBody: '',
  topJoin: '',
  topLeft: '',
  topRight: '',

  bottomBody: '',
  bottomJoin: '',
  bottomLeft: '',
  bottomRight: '',

  bodyJoin: '',
  bodyLeft: '',
  bodyRight: '',

  joinBody: '',
  joinLeft: '',
  joinRight: '',
}
const TABLE_OPTIONS = {
  border: NO_BORDERS,
  singleLine: true,
}

const FIRST_COLUMN = { paddingLeft: 2 }
const SHORT_OPTION_COLUMN = { alignment: 'right' as const }
const LONG_OPTION_COLUMN = { paddingLeft: 0 }
const DESCRIPTION_COLUMN = {
  paddingRight: 0,
  wrapWord: true,
}

function renderDescriptionList (descriptionItems: DescriptionItem[]) {
  const data = descriptionItems
    .sort((item1, item2) => item1.name.localeCompare(item2.name))
    .map(({ shortAlias, name, description }) => [shortAlias && `${shortAlias},` || '', name, description || ''])
  const firstColumnMaxWidth = getColumnMaxWidth(data, 0)
  const descriptionColumnWidth = consoleWidth - firstColumnMaxWidth - getColumnMaxWidth(data, 1) - 2 - 2 - 1
  if (firstColumnMaxWidth === 0) {
    return multiTrim(table(data.map(([, ...row]) => row), {
      ...TABLE_OPTIONS,
      columns: [
        {
          ...LONG_OPTION_COLUMN,
          ...FIRST_COLUMN,
        },
        {
          width: descriptionColumnWidth,
          ...DESCRIPTION_COLUMN,
        },
      ],
    }))
  }
  return multiTrim(table(data, {
    ...TABLE_OPTIONS,
    columns: [
      {
        ...SHORT_OPTION_COLUMN,
        ...FIRST_COLUMN,
      },
      LONG_OPTION_COLUMN,
      {
        width: descriptionColumnWidth,
        ...DESCRIPTION_COLUMN,
      },
    ],
  }))
}

function multiTrim (str: string) {
  return str.split('\n').map(
    (line) => line.trimRight()
  ).filter(Boolean).join('\n')
}

function getColumnMaxWidth (data: string[][], columnNumber: number) {
  return data.reduce((maxWidth, row) => Math.max(maxWidth, row[columnNumber].length), 0)
}
