declare function makeEmptyDir (dir: string, opts?: { recursive?: boolean }): Promise<'created' | 'emptied'>

declare namespace makeEmptyDir {
  function sync(dir: string, opts?: { recursive?: boolean }): 'created' | 'emptied'
}

export = makeEmptyDir
