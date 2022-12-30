export function validateExtension (extension: string): void {
  if (extension !== '.gltf' && extension !== '.glb') {
    console.error('Error: Input file must be a .gltf or .glb file')
    process.exit(1)
  }
}
