#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'

import { flagOptions } from './flagOptions'
import { validateExtension } from './utils'

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
const outputPath = argv.output as string | undefined

const inputDir = path.dirname(inputPath)
const inputName = path.basename(inputPath, path.extname(inputPath))
const inputExtension = path.extname(inputPath).toLowerCase()

validateExtension(inputExtension)

// Prevents eslint error
console.log(outputPath, inputDir, inputName)
