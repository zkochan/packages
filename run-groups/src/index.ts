import pLimit from 'p-limit'

export default async (concurrency: number, groups: (() => Promise<void>)[][]) => {
  const limitRun = pLimit(concurrency)
  for (const tasks of groups) {
    await Promise.all(tasks.map((task) => limitRun(task)))
  }
}
