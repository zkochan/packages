declare function pathTemp(folder: string): string

declare namespace pathTemp {
  function fastPathTemp(file: string): string
}

export = pathTemp

