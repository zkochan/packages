declare namespace writeIniFile {
  interface WriteIniFileOpts {
    section?: string
    mode?: number
  }
  function writeIniFile (filePath: string, data: Object, opts?: WriteIniFileOpts): Promise<void>
  function writeIniFileSync (filePath: string, data: Object, opts?: WriteIniFileOpts): void
}

export = writeIniFile


