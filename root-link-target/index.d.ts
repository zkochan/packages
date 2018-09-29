export = rootLinkTarget

declare function rootLinkTarget (filePath: string): Promise<string>

declare namespace rootLinkTarget {
  function sync (filePath: string): string
}
