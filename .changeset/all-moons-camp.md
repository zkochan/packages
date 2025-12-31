---
"write-yaml-file": major
---

The `yaml` NPM package is now used for writing instead of `js-yaml`. This migration supports a broader migration in pnpm from `js-yaml` to `yaml`. The options passed to the write functions now need to [match the schema defined by `yaml`'s `toString()` function](https://eemeli.org/yaml/#tostring-options).
