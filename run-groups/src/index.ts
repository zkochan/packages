import pLimit from 'p-limit'

export async function runGroups (concurrency: number, groups: (() => Promise<void>)[][]) {
  const limitRun = pLimit(concurrency)
  const promises = [];
  for (const tasks of groups) {
    promisess.push(...tasks.map((task) => limitRun(task))))
  }
  await Promise.all(promises)
}
