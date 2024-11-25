export default async function pMapValue<K extends string | number | symbol, V, U> (
  mapper: (value: V, key: K, obj: Record<K, V>) => Promise<U>,
  obj: Record<K, V>
): Promise<Record<K, U>> {
  const result: Record<K, U> = {} as Record<K, U>
  const entries = Object.entries(obj) as [K, V][];
  await Promise.all(
    entries.map(async ([key, value]) => {
      // initialize property in the resulting object to guarantee key order
      result[key] = undefined as unknown as U;
      result[key] = await mapper(value, key, obj)
    })
  )
  return result
}

