import path from 'node:path'
import isWindows from 'is-windows'

export const betterPathResolve = isWindows() ? winResolve : path.resolve

function winResolve (p) {
  if (arguments.length === 0) return path.resolve()
  if (typeof p !== 'string') {
    return path.resolve(p)
  }
  // c: => C:
  if (p[1] === ':') {
    const cc = p[0].charCodeAt()
    if (cc < 65 || cc > 90) {
      p = `${p[0].toUpperCase()}${p.substr(1)}`
    }
  }
  // On Windows path.resolve('C:') returns C:\Users\
  // We resolve C: to C:
  if (p.endsWith(':')) {
    return p
  }
  return path.resolve(p)
}
