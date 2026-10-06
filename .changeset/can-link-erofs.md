---
"can-link": patch
"root-link-target": patch
---

Return `false` instead of throwing when linking fails with `EROFS` (read-only file system), so `root-link-target` skips read-only directories such as `/` on immutable distros.
