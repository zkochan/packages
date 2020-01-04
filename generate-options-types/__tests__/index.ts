import { stripIndent } from 'common-tags'
import path = require('path')
import url = require('url')
import generateNoptsTypes from '../src'

test('generating types', () => {
  expect(generateNoptsTypes('Options', {
    b: Boolean,
    n: Number,
    s: String,
    s2: [String],
    s3: [null, String, Array],
    f: function () {},
    enum: ['always', 'auto', 1, false],
    's-arr': [String, Array],
    narr: [Number, Array],
    carr: [['foo', 'bar'], Array],
    carr2: ['foo', 'bar', Array],
    u: url,
    p: path,
  })).toBe(stripIndent`
    export type Options = {
      b: Boolean,
      n: Number,
      s: String,
      s2: String,
      s3: Array<null | String>,
      f: unknown,
      enum: "always" | "auto" | 1 | false,
      sArr: Array<String>,
      narr: Array<Number>,
      carr: Array<"foo" | "bar">,
      carr2: Array<"foo" | "bar">,
      u: String,
      p: String,
    }`)
})
