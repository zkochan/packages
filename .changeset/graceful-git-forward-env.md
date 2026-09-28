---
"graceful-git": minor
---

Forward the `env` option to the spawned git process. Previously only `cwd` was forwarded, so environment overrides like `GIT_TERMINAL_PROMPT=0` silently never reached git.
