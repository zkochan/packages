export function makeEmptyDir (dir: string, opts?: { recursive?: boolean }): Promise<'created' | 'emptied'>
export function makeEmptyDirSync (dir: string, opts?: { recursive?: boolean }): 'created' | 'emptied'
