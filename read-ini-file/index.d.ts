declare namespace readIniFile {
  declare function readIniFile (filePath: string): Promise<Object>
  declare function readIniFileSync (filePath: string): Promise<Object>
}

export = readIniFile

