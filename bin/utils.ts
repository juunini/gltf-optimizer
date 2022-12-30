export function validateExtension (extension: string): void {
  if (extension !== '.gltf' && extension !== '.glb') {
    console.error('Error: Input file must be a .gltf or .glb file')
    process.exit(1)
  }
}

export type AllowedExtensions = '.gltf' | '.glb'

export function getOutputExtension ({
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
