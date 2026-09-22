export function preferredPM (pkgPath: string): Promise<{ name: 'npm' | 'pnpm' | 'yarn' | 'bun' | 'nub', version: string } | null>
