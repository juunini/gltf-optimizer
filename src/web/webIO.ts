import draco3d from 'draco3d'
import { WebIO } from '@gltf-transform/core'
import {
  DracoMeshCompression,
  MaterialsEmissiveStrength,
  MaterialsSpecular,
  TextureTransform,
  TextureWebP
} from '@gltf-transform/extensions'

export async function webIO (): Promise<WebIO> {
  return new WebIO()
    .registerExtensions([
      DracoMeshCompression,
      MaterialsSpecular,
      MaterialsEmissiveStrength,
      TextureWebP,
      TextureTransform
    ])
    .registerDependencies({
      'draco3d.decoder': await draco3d.createDecoderModule(), // Optional.
      'draco3d.encoder': await draco3d.createEncoderModule() // Optional.
    })
}
