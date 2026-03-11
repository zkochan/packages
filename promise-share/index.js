import pReflect from 'p-reflect'

export function pShare (p) {
  const reflected = pReflect(p)
  return async () => {
    const reflection = await reflected
    if (reflection.isRejected) throw reflection.reason
    return reflection.value
  }
}
