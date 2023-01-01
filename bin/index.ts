#!/usr/bin/env node
import yargs from 'yargs'

import { flagOptions } from './flagOptions.js'
import { GLTFPipeline } from './gltfPipeline.js'
import {
  inputName,
  outputDirectory,
  removeAllWithoutExtension,
  replaceTextImageToWebP
} from './utils.js'
import { convertImageToWebP } from './utilsCoverageIgnore.js'

const argv = yargs(process.argv.slice(2))
  .usage('Usage: gltf-optimizer -i inputPath -o outputPath')
  .example('gltf-optimizer', '-i model.gltf')
  .example('gltf-optimizer', '-i model.glb -o ./output')
  .help('h')
  .alias('h', 'help')
  .options(flagOptions)
  .parseSync()

const fileName = inputName(argv)
const outputDir = outputDirectory(argv)
const outputFileName = (extension: string): string => `${outputDir}/${fileName}${extension}`

void GLTFPipeline({ ...argv, separate: true, json: true, binary: false })
  .then(async () => await convertImageToWebP(outputFileName('.gltf'), (argv.texture as any).webp))
  .then(() => replaceTextImageToWebP(outputFileName('.gltf')))
  .then(async () => await GLTFPipeline({
    ...argv,
    input: outputFileName('.gltf'),
    separate: false,
    binary: true,
    json: false,
    draco: { compressMeshes: false }
  }))
  .then(() => removeAllWithoutExtension(outputDir, '.glb'))
