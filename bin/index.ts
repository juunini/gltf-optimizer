#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'

import type { AllowedExtensions } from './utils'
import { flagOptions } from './flagOptions'
import { getOutputExtension, validateExtension } from './utils'

const argv = yargs(process.argv.slice(2))
  .usage('Usage: gltf-optimizer -i inputPath -o outputPath')
  .example('gltf-optimizer', '-i model.gltf')
  .example('gltf-optimizer', '-i model.gltf -b')
  .example('gltf-optimizer', '-i model.glb -o ./output')
  .help('h')
  .alias('h', 'help')
  .options(flagOptions)
  .parseSync()

const inputPath = argv.input as string
const outputPath = (argv.output as string | undefined) ?? ''

const inputDir = path.dirname(inputPath)
const inputExtension = path.extname(inputPath).toLowerCase()

validateExtension(inputExtension)

const outputExtension = getOutputExtension({
  inputExtension: inputExtension as AllowedExtensions,
  isJson: argv.json as boolean,
  isBinary: argv.binary as boolean
})
const outputDirectory = path.dirname(outputPath)

const fileName = path.basename(inputPath, path.extname(inputPath))

// Prevents eslint error
console.log(inputDir, fileName, outputExtension, outputDirectory)
