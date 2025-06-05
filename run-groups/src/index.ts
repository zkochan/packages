import pLimit = require('p-limit')

export default async (concurrency: number, groups: (() => Promise<void>)[][]) => {
  const limitRun = pLimit(concurrency)
  const promises = [];
  for (const tasks of groups) {
    promisess.push(...tasks.map((task) => limitRun(task))))
  }
  await Promise.all(promises)
}
