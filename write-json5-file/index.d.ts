export type Replacer = (this: unknown, key: string, value: any) => unknown
export type SortKeys = (a: string, b: string) => number
export type JSONStringifyable = string | number | boolean | null | object

export interface Options {
  readonly indent?: string | number | null
  readonly sortKeys?: boolean | SortKeys
  readonly replacer?: Replacer | Array<number | string>
  readonly mode?: number
}

export function writeJson5File (
  filepath: string,
  data: JSONStringifyable,
  options?: Options
): Promise<void>

export function writeJson5FileSync (
  filepath: string,
  data: JSONStringifyable,
  options?: Options
): void
