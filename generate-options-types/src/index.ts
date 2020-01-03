import camelCase = require('camelcase')

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
    case String: return 'String'
    case Number: return 'Number'
  }
  if (!Array.isArray(flagType)) {
    return JSON.stringify(flagType)
  }
  if (flagType.length === 1) {
    return `${generateFlagType(flagType[0])}`
  }
  if (flagType.length === 2 && flagType[1] === Array) {
    return `Array<${generateFlagType(flagType[0])}>`
  }
  return flagType.map((subType) => generateFlagType(subType)).join(' | ')
}
