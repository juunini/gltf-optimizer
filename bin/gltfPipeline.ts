// @ts-ignore
import { defaultValue } from 'cesium'
// @ts-ignore
import gltfPipeline from 'gltf-pipeline'
import fsExtra from 'fs-extra'
import path from 'path'

export async function GLTFPipeline (argv: Record<string, unknown>): Promise<any> {
  const inputPath = argv.input as string
  const inputDirectory = path.dirname(inputPath)
  const inputName = path.basename(inputPath, path.extname(inputPath))
  const inputExtension = path.extname(inputPath).toLowerCase()

  if (inputExtension !== '.gltf' && inputExtension !== '.glb') {
    console.log(`Error: unrecognized file extension "${inputExtension}".`)
    return
  }

  // TODO: Will be fix `.glb` extension only
  const outputPath = path.join(
    path.basename(argv.output as string),
    `${inputName}${argv.json === true ? '.gltf' : '.glb'}`
  )
  const outputDirectory = path.dirname(outputPath)
  const outputName = path.basename(outputPath, path.extname(outputPath))
  const outputExtension = path.extname(outputPath).toLowerCase()
  if (outputExtension !== '.gltf' && outputExtension !== '.glb') {
    console.log(`Error: unrecognized file extension "${outputExtension}".`)
    return
  }

  const dracoOptions = (argv.draco as Record<string, unknown>).compressMeshes === false
    ? undefined
    : defaultValue(argv.draco, {})

  const options = {
    resourceDirectory: inputDirectory,
    separate: argv.separate,
    separateTextures: argv.separateTextures,
    stats: argv.stats,
    keepUnusedElements: argv.keepUnusedElements,
    keepLegacyExtensions: argv.keepLegacyExtensions,
    name: outputName,
    dracoOptions
  }

  const inputIsBinary = inputExtension === '.glb'
  const outputIsBinary = outputExtension === '.glb'

  const jsonOptions = {
    spaces: 2
  }

  const read = inputIsBinary ? fsExtra.readFile : fsExtra.readJson
  const write = outputIsBinary ? fsExtra.outputFile : fsExtra.outputJson
  const writeOptions = outputIsBinary ? undefined : jsonOptions
  const run = inputIsBinary
    ? outputIsBinary
      ? gltfPipeline.processGlb
      : gltfPipeline.glbToGltf
    : outputIsBinary
      ? gltfPipeline.gltfToGlb
      : gltfPipeline.processGltf

  function saveSeparateResources (separateResources: Record<string, unknown>): Array<Promise<void>> {
    const resourcePromises = []
    for (const relativePath in separateResources) {
      if (Object.prototype.hasOwnProperty.call(separateResources, relativePath)) {
        const resource = separateResources[relativePath]
        const resourcePath = path.join(outputDirectory, relativePath)
        resourcePromises.push(fsExtra.outputFile(resourcePath, resource))
      }
    }
    return resourcePromises
  }

  console.time('Total')

  return await read(inputPath)
    .then(function (gltf) {
      return run(gltf, options)
    })
    .then(async function (results) {
      const gltf = defaultValue(results.gltf, results.glb)
      const separateResources = results.separateResources
      return await Promise.all([
        write(outputPath, gltf, writeOptions),
        saveSeparateResources(separateResources)
      ])
    })
    .then(function () {
      console.timeEnd('Total')
    })
    .catch(function (error) {
      console.log(error)
      process.exit(1)
    })
}
