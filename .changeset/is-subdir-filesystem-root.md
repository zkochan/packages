---
"is-subdir": patch
---

`isSubdir()` and `strict()` now match subdirectories of a filesystem root, such as `/` or `C:\`. Previously, they returned `false` for every path when the parent directory was a filesystem root.
