import { defaultValue } from 'cesium'

export function exitWhenInvalidateExtension (extension: string): void {
  if (extension !== '.gltf' && extension !== '.glb') {
    console.error('Error: Input file must be a .gltf or .glb file')
    process.exit(1)
  }
}

export type AllowedExtensions = '.gltf' | '.glb'

export function outputExtension ({
  inputExtension,
  isJson,
  isBinary
}: {
  inputExtension: AllowedExtensions
  isJson: boolean
  isBinary: boolean
}): AllowedExtensions {
  if (isJson) return '.gltf'
  if (isBinary) return '.glb'
  return inputExtension
}

export function dracoOptions (argv: Record<string, unknown>): Record<string, unknown> | undefined {
  if ((argv.draco as Record<string, unknown>).compressMeshes === false) {
    return undefined
  }

  return defaultValue(argv.draco, {})
}
