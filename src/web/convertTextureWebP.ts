/* eslint-disable @typescript-eslint/promise-function-async */
import { Document } from '@gltf-transform/core'
import { arrayBufferToWebP } from 'webp-converter-browser'

export async function convertTextureWebP (doc: Document, resolution: number = 1024): Promise<void> {
  await Promise.all(
    doc.getRoot().listTextures().map((texture) => {
      const [width, height] = texture.getSize() ?? [1024, 1024]
      const rate = resolution / bigger(width, height)

      return arrayBufferToWebP(
        texture.getImage() as Uint8Array,
        { width: width * rate, height: height * rate }
      )
        .then((webp) => webp.arrayBuffer())
        .then((webp) => new Uint8Array(webp))
        .then((webp) => {
          texture.copy(
            doc
              .createTexture()
              .setMimeType('image/webp')
              .setImage(webp)
          )
        })
    })
  )
}

function bigger (a: number, b: number): number {
  return a >= b ? a : b
}
