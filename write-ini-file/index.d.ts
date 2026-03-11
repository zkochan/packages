export interface WriteIniFileOpts {
  section?: string
  mode?: number
}

export function writeIniFile (filePath: string, data: Object, opts?: WriteIniFileOpts): Promise<void>
export function writeIniFileSync (filePath: string, data: Object, opts?: WriteIniFileOpts): void
