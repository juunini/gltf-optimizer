import path from 'path'
// @ts-ignore
import { defaultValue } from 'cesium'
// @ts-ignore
import gltfPipeline from 'gltf-pipeline'

export function exitWhenInvalidateExtension (extension: string): void {
  if (extension !== '.gltf' && extension !== '.glb') {
    console.error('Error: Input file must be a .gltf or .glb file')
    process.exit(1)
  }
}

export function inputName (argv: Record<string, unknown>): string {
  return path.basename(argv.input as string, path.extname(argv.input as string))
}

export function outputDirectory (argv: Record<string, unknown>): string {
  const directory = path.dirname(argv.output as string ?? '.')

  return directory === '.'
    ? path.basename(argv.output as string ?? '.')
    : directory
}

export type AllowedExtensions = '.gltf' | '.glb'

export function inputExtension (argv: Record<string, unknown>): string {
  return path.extname(argv.input as string).toLowerCase()
}

export function outputExtension (argv: Record<string, unknown>): AllowedExtensions {
  if (argv.json === true) return '.gltf'

  if (argv.binary === true) return '.glb'

  return path.extname(argv.input as string).toLowerCase() as AllowedExtensions
}

export function dracoOptions (argv: Record<string, unknown>): Record<string, unknown> | undefined {
  if ((argv.draco as Record<string, unknown>).compressMeshes === false) {
    return undefined
  }

  return defaultValue(argv.draco, {})
}

export function inputIsBinary (argv: Record<string, unknown>): boolean {
  return inputExtension(argv) === '.glb'
}

export function outputIsBinary (argv: Record<string, unknown>): boolean {
  return outputExtension(argv) === '.glb'
}

export function runOption (argv: Record<string, unknown>): (gltf: any, options: any) => any {
  if (inputIsBinary(argv) && outputIsBinary(argv)) return gltfPipeline.processGlb

  if (inputIsBinary(argv) && !outputIsBinary(argv)) return gltfPipeline.glbToGltf

  if (!inputIsBinary(argv) && outputIsBinary(argv)) return gltfPipeline.gltfToGlb

  return gltfPipeline.processGltf
}
