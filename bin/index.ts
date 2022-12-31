#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'
import fsExtra from 'fs-extra'
import { defaultValue } from 'cesium'

import { flagOptions } from './flagOptions'
import {
  dracoOptions,
  exitWhenInvalidateExtension,
  inputExtension,
  inputIsBinary,
  outputDirectory,
  outputExtension,
  outputIsBinary,
  runOption
} from './utils'

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

const inputDirectory = path.dirname(inputPath)

exitWhenInvalidateExtension(inputExtension(argv))

const fileName = path.basename(inputPath, path.extname(inputPath))
const outputPath = path.join(outputDirectory(argv.output), fileName + outputExtension(argv))

const options = {
  resourceDirectory: inputDirectory,
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

export function saveSeparateResources (separateResources: Record<string, unknown>): Array<Promise<void>> {
  const resourcePromises: Array<Promise<void>> = []

  Object.keys(separateResources).forEach((relativePath) => {
    if (Object.prototype.hasOwnProperty.call(separateResources, relativePath)) {
      const resource = separateResources[relativePath]
      const resourcePath = path.join(outputDirectory(argv.output), relativePath)
      resourcePromises.push(fsExtra.outputFile(resourcePath, resource))
    }
  })

  return resourcePromises
}

console.time('Total')

read(inputPath)
  .then((gltf) => run(gltf, options))
  .then(async (results) => {
    const gltf = defaultValue(results.gltf, results.glb)
    const separateResources = results.separateResources
    return await Promise.all([
      write(outputPath, gltf, writeOptions),
      saveSeparateResources(separateResources)
    ])
  })
  .then(() => console.timeEnd('Total'))
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
