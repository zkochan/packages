import camelCase = require('camelcase')
import path = require('path')
import url = require('url')

export default function generateOptionsTypes (
  typeName: string,
  flagTypeMap: Record<string, Object>,
) {
  let code = `export type ${typeName} = {\n`
  for (const [flagName, flagType] of Object.entries(flagTypeMap)) {
    code += `  ${camelCase(flagName)}: ${generateFlagType(flagType)},\n`
  }
  code += '}'
  return code
}

function generateFlagType (flagType: Object): string {
  switch (flagType) {
    case Boolean: return 'Boolean'
    case String:
    case url:
    case path:
      return 'String'
    case Number: return 'Number'
  }
  if (!Array.isArray(flagType)) {
    if (typeof flagType === 'function') return 'unknown'
    try {
      return JSON.stringify(flagType)
    } catch (err) {
      return 'unknown'
    }
  }
  if (flagType.length === 1) {
    return `${generateFlagType(flagType[0])}`
  }
  if (flagType[flagType.length - 1] === Array) {
    return `Array<${flagType.slice(0, flagType.length - 1).map((subType) => generateFlagType(subType)).join(' | ')}>`
  }
  return flagType.map((subType) => generateFlagType(subType)).join(' | ')
}
