import { table, getBorderCharacters } from 'table'

type DescriptionItem = { shortAlias?: string, name: string, description?: string }

export = function renderHelp (
  config: {
    aliases?: string[],
    descriptionLists?: Array<{ title: string, list: DescriptionItem[] }>,
    description?: string,
    usages: string[],
    url?: string,
    width?: number,
  }
) {
  const width = config.width ?? process.stdout.columns ?? 80
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
      outputSections.push(`${title}:\n` + renderDescriptionList(list, width))
    }
  }
  if (config.url) {
    outputSections.push(`Visit ${config.url} for documentation about this command.`)
  }
  return outputSections.join('\n\n')
}

const TABLE_OPTIONS = {
  border: getBorderCharacters("void"),
  singleLine: true,
}

const FIRST_COLUMN = { paddingLeft: 2, paddingRight: 0 }
const SHORT_OPTION_COLUMN = { alignment: 'right' as const }
const LONG_OPTION_COLUMN = { paddingLeft: 1, paddingRight: 2 }
const DESCRIPTION_COLUMN = {
  paddingLeft: 0,
  paddingRight: 0,
  wrapWord: true,
}

function renderDescriptionList (descriptionItems: DescriptionItem[], width: number) {
  const data = descriptionItems
    .sort((item1, item2) => item1.name.localeCompare(item2.name))
    .map(({ shortAlias, name, description }) => [shortAlias && `${shortAlias},` || ' ', name, description || ''])
  const firstColumnMaxWidth = Math.max(getColumnMaxWidth(data, 0), 3)
  const nameColumnMaxWidth = Math.max(getColumnMaxWidth(data, 1), 19)
  const descriptionColumnWidth = Math.max(
    width -
      (FIRST_COLUMN.paddingLeft +
        firstColumnMaxWidth +
        FIRST_COLUMN.paddingRight +
        LONG_OPTION_COLUMN.paddingLeft +
        nameColumnMaxWidth +
        LONG_OPTION_COLUMN.paddingRight +
        DESCRIPTION_COLUMN.paddingLeft +
        DESCRIPTION_COLUMN.paddingRight),
    2
  )
  return multiTrim(table(data, {
    ...TABLE_OPTIONS,
    columns: {
      0: {
        width: firstColumnMaxWidth,
        ...SHORT_OPTION_COLUMN,
        ...FIRST_COLUMN,
      },
      1: {
        width: nameColumnMaxWidth,
        ...LONG_OPTION_COLUMN,
      },
      2: {
        width: descriptionColumnWidth,
        ...DESCRIPTION_COLUMN,
      },
    },
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
