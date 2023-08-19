declare function rimraf (p: string): Promise<void>

declare namespace rimraf {
  function sync(p: string): void
}

export = rimraf
