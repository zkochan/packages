export function comverToSemver (comver) {
  if (!comver.includes('.')) return `${comver}.0.0`
  return `${comver}.0`
}
