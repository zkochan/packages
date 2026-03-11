import { gracefulGit } from 'graceful-git'

gracefulGit(['status', 'README.md'])
  .then(result => console.log(result.stdout))
  .catch(err => console.error(err))
