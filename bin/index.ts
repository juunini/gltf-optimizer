#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'

import { flagOptions } from './flagOptions.js'
import { GLTFPipeline } from './gltfPipeline.js'
import { inputName, outputDirectory } from './utils.js'

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
  .then(() => {
    const gltf = fsExtra.readJSONSync(outputFileName('.gltf'))
    const textures = gltf.images.map((image: any) => `${outputDir}/${image.uri as string}`)

    // @ts-ignore
    return imagemin(textures, {
      destination: path.dirname(textures[0]),
      // @ts-ignore
      plugins: [imageminWebp({ ...argv.texture.webp })]
    })
  })
  .then(() =>
    fs.writeFileSync(
      outputFileName('.gltf'),
      fs.readFileSync(outputFileName('.gltf'), 'utf8')
        .replaceAll('.png', '.webp')
        .replaceAll('.jpg', '.webp')
        .replaceAll('.jpeg', '.webp')
        .replaceAll('image/png', 'image/webp')
        .replaceAll('image/jpeg', 'image/webp')
    )
  )
  .then(async () => await GLTFPipeline({
    ...argv,
    input: outputFileName('.gltf'),
    separate: false,
    binary: true,
    json: false,
    draco: { compressMeshes: false }
  }))
  .then(() =>
    fs.readdirSync(outputDir)
      .filter((file) => path.extname(file) !== '.glb')
      .forEach((file) => fsExtra.removeSync(`${outputDir}/${file}`))
  )
