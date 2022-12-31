#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'

import { flagOptions } from './flagOptions.js'
import { GLTFPipeline } from './gltfPipeline.js'

const argv = yargs(process.argv.slice(2))
  .usage('Usage: gltf-optimizer -i inputPath -o outputPath')
  .example('gltf-optimizer', '-i model.gltf')
  .example('gltf-optimizer', '-i model.glb -o ./output')
  .help('h')
  .alias('h', 'help')
  .options(flagOptions)
  .parseSync()

void GLTFPipeline({ ...argv, separate: true, json: true })
  .then(() => {
    const inputPath = argv.input as string
    const inputName = path.basename(inputPath, path.extname(inputPath))
    const outputPath = path.basename(argv.output as string)
    const gltf = fsExtra.readJSONSync(`${outputPath}/${inputName}.gltf`)
    const textures = gltf.images.map((image: any) => `${outputPath}/${image.uri as string}`)

    // @ts-ignore
    return imagemin(textures, {
      destination: path.dirname(textures[0]),
      // @ts-ignore
      plugins: [imageminWebp({ ...argv.texture.webp })]
    })
  })
  .then(() => {
    const inputPath = argv.input as string
    const inputName = path.basename(inputPath, path.extname(inputPath))
    const outputPath = path.basename(argv.output as string)
    const gltf = fs.readFileSync(`${outputPath}/${inputName}.gltf`, 'utf8')
    fs.writeFileSync(
      `${outputPath}/${inputName}.gltf`,
      gltf
        .replaceAll('.png', '.webp')
        .replaceAll('.jpg', '.webp')
        .replaceAll('.jpeg', '.webp')
        .replaceAll('image/png', 'image/webp')
        .replaceAll('image/jpeg', 'image/webp')
    )
  })
  .then(async () => {
    const inputPath = argv.input as string
    const inputName = path.basename(inputPath, path.extname(inputPath))
    const input = path.join(
      path.basename(argv.output as string),
      `${inputName}.gltf`
    )

    return await GLTFPipeline({ ...argv, input, binary: true, draco: { compressMeshes: false } })
  })
  .then(() => {
    const inputPath = argv.input as string
    const inputName = path.basename(inputPath, path.extname(inputPath))
    const outputPath = path.join(
      path.basename(argv.output as string),
      `${inputName}${argv.json === true ? '.gltf' : '.glb'}`
    )
    const outputDirectory = path.dirname(outputPath)

    fs.readdirSync(outputDirectory)
      .filter((file) => path.extname(file) !== '.glb')
      .forEach((file) => fsExtra.removeSync(`${outputDirectory}/${file}`))
  })
