import { stripIndent } from 'common-tags'
import generateNoptsTypes from '../src'

test('generating types', () => {
  expect(generateNoptsTypes('Options', {
    b: Boolean,
    n: Number,
    s: String,
    s2: [String],
    enum: ['always', 'auto', 1, false],
    's-arr': [String, Array],
    narr: [Number, Array],
    carr: [['foo', 'bar'], Array],
  })).toBe(stripIndent`
    export type Options = {
      b: Boolean,
      n: Number,
      s: String,
      s2: String,
      enum: "always" | "auto" | 1 | false,
      sArr: Array<String>,
      narr: Array<Number>,
      carr: Array<"foo" | "bar">,
    }`)
})
