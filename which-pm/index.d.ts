export function whichPM (pkgPath: string): Promise<WhichPMResult | null>

export type WhichPMResult = NPM | YARN | PNPM | BUN | NUB | Other

export interface NPM {
  readonly name: 'npm'
}

export interface YARN {
  readonly name: 'yarn'
}

export interface PNPM {
  readonly name: 'pnpm'
  readonly version: string
}

export interface BUN {
  readonly name: 'bun'
}

export interface NUB {
  readonly name: 'nub'
}

export interface Other {
  readonly name: string
  readonly version?: string
}
