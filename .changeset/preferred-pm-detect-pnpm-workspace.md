---
"preferred-pm": patch
---

Detect pnpm inside a pnpm workspace via `pnpm-workspace.yaml`, not only `pnpm-lock.yaml`. The README already documents that pnpm is preferred inside a pnpm workspace, but the lookup only searched for `pnpm-lock.yaml`. Repositories that set `lockfile: false` (no committed lockfile) were therefore not detected as pnpm projects. The directory walk now also looks for `pnpm-workspace.yaml`, which pnpm v10+ requires for workspace/config. Fixes #197.
