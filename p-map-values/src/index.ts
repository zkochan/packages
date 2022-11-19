export default async function pMapValue<K extends string | number | symbol, V, U> (
  mapper: (value: V, key: K, obj: Record<K, V>) => Promise<U>,
  obj: Record<K, V>
): Promise<Record<K, U>> {
  const result: Record<K, U> = {} as Record<K, U>
  await Promise.all(
    Object.entries(obj).map(async ([key, value]: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      result[key] = await mapper(value, key, obj)
    })
  )
  return result
}

