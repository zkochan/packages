export = makeEmptyDir

declare function makeEmptyDir (dir: string, opts?: { recursive?: boolean }): Promise<'created' | 'emptied'>
