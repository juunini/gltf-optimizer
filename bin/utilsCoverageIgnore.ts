import path from 'path'
import fsExtra from 'fs-extra'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'

export async function convertImageToWebP (gltfFilePath: string, webpOptions: unknown): Promise<unknown> {
  const gltf = fsExtra.readJSONSync(gltfFilePath)
  const textures = gltf.images.map((image: any) => `${path.dirname(gltfFilePath)}/${image.uri as string}`)

  // @ts-ignore
  return imagemin(textures, {
    destination: path.dirname(textures[0]),
    // @ts-ignore
    plugins: [imageminWebp({ ...webpOptions })]
  })
}
