#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'
import fsExtra from 'fs-extra'

import { flagOptions } from './flagOptions'
import { dracoOptions, exitWhenInvalidateExtension, inputExtension, inputIsBinary, outputIsBinary, runOption } from './utils'

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

exitWhenInvalidateExtension(inputExtension(argv))

const outputDirectory = path.dirname(outputPath)
const fileName = path.basename(inputPath, path.extname(inputPath))

const options = {
  resourceDirectory: inputDir,
  separate: argv.separate,
  separateTextures: argv.separateTextures,
  stats: argv.stats,
  keepUnusedElements: argv.keepUnusedElements,
  keepLegacyExtensions: argv.keepLegacyExtensions,
  name: fileName,
  dracoOptions: dracoOptions(argv)
}

const read = inputIsBinary(argv) ? fsExtra.readFile : fsExtra.readJson
const write = outputIsBinary(argv) ? fsExtra.outputFile : fsExtra.outputJson
const writeOptions = outputIsBinary(argv) ? undefined : { spaces: 2 }
const run = runOption(argv)

// Prevents eslint error
console.log(outputDirectory, options, read, write, writeOptions, run)
