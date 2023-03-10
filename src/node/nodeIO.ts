import draco3d from 'draco3d'
import { NodeIO } from '@gltf-transform/core'
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer'
import {
  DracoMeshCompression,
  MaterialsEmissiveStrength,
  MaterialsSpecular,
  TextureTransform,
  TextureWebP
} from '@gltf-transform/extensions'

export async function nodeIO (): Promise<NodeIO> {
  return new NodeIO()
    .registerExtensions([
      DracoMeshCompression,
      MaterialsSpecular,
      MaterialsEmissiveStrength,
      TextureWebP,
      TextureTransform
    ])
    .registerDependencies({
      'draco3d.decoder': await draco3d.createDecoderModule(), // Optional.
      'draco3d.encoder': await draco3d.createEncoderModule(), // Optional.
      'meshopt.decoder': MeshoptDecoder,
      'meshopt.encoder': MeshoptEncoder
    })
}
