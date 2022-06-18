import pShare from 'promise-share'

export interface SafePromiseDefer<T> {
  (): Promise<T>
  resolve: (v: T) => void
  reject: (err: Error) => void
}

export default function safeDeferredPromise<T> (): SafePromiseDefer<T> {
  let _resolve!: (v: T) => void
  let _reject!: (err: Error) => void

  const promiseFn = pShare(new Promise<T>((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  }))

  return Object.assign(promiseFn, { resolve: _resolve, reject: _reject })
}

