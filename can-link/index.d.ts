export = canLink

declare function canLink (existingPath: string, newPath: string): Promise<boolean>

declare namespace canLink {
  function sync (existingPath: string, newPath: string): boolean
}
