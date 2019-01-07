import pLimit = require('p-limit')

export default async (concurrency: number, groups: (() => Promise<void>)[][]) => {
  const limitRun = pLimit(concurrency)
  for (const tasks of groups) {
    await Promise.all(tasks.map(limitRun))
  }
}
