#!/usr/bin/env node
import fs = require('fs')
import path = require('path')
import generateOptionsTypes from '.'

require('ts-node').register()

const typesFile = path.resolve(process.argv[2])
const types = require(typesFile).default
const typeName = process.argv[3]

const generatedCode = generateOptionsTypes(typeName, types)

const outputDir = path.dirname(typesFile)
const generatedFile = path.join(outputDir, `${typeName}.generated.ts`)
fs.writeFileSync(generatedFile, generatedCode)
