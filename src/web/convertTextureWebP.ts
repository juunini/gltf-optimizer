/* eslint-disable @typescript-eslint/promise-function-async */
import { Document } from '@gltf-transform/core'
import { arrayBufferToWebP } from 'webp-converter-browser'

export async function convertTextureWebP (doc: Document): Promise<void> {
  await Promise.all(
    doc.getRoot().listTextures().map((texture) =>
      arrayBufferToWebP(texture.getImage() as Uint8Array)
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
    )
  )
}
