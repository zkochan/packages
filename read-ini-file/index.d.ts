declare namespace readIniFile {
  function readIniFile (filePath: string): Promise<Object>
  function readIniFileSync (filePath: string): Object
}

export = readIniFile

