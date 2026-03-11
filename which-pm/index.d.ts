export function whichPM (pkgPath: string): Promise<WhichPMResult | null>

export type WhichPMResult = NPM | YARN | PNPM | BUN | Other

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

export interface Other {
  readonly name: string
  readonly version?: string
}
