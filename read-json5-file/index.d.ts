declare const readJson5File: {
  <T = unknown>(filePath: string): Promise<T>
  sync: <T = unknown>(filePath: string) => T
}

export = readJson5File
