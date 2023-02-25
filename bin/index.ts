#!/usr/bin/env node
import yargs from 'yargs'
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'

import { flagOptions } from './flagOptions'
import { optimizer } from '../src/index'
import { outputDirectory } from './utils'

const argv = yargs(process.argv.slice(2))
  .usage('Usage: gltf-optimizer -i inputPath -o outputPath')
  .example('gltf-optimizer', '-i model.glb')
  .example('gltf-optimizer', '-i model.glb -o ./output')
  .help('h')
  .alias('h', 'help')
  .options(flagOptions)
  .parseSync()

const glb = readFileSync(argv.input as string)

void optimizer.node(glb, {
  emissiveStrength: argv.emissiveStrength as number,
  transform: {
    draco: {
      method: (argv.draco as any).method
    },
    weld: {
      tolerance: (argv.weld as any).tolerance as number
    },
    simplify: {
      enabled: (argv.simplify as any).enabled as boolean,
      ratio: (argv.simplify as any).ratio as number,
      error: (argv.simplify as any).error as number
    },
    texture: {
      resize: {
        resolution: (argv.texture as any).resize.resolution as number,
        filter: (argv.texture as any).resize.filter as string
      }
    }
  }
})
  .then((result) => {
    const outputDir = outputDirectory(argv)

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir)
    }

    writeFileSync(`${outputDir}/compressed.glb`, result)
  })
