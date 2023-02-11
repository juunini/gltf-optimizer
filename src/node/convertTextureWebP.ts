/* eslint-disable @typescript-eslint/promise-function-async */
import { Document } from '@gltf-transform/core'

export async function convertTextureWebP (doc: Document, resolution: number = 1024): Promise<void> {
  await Promise.all(
    doc.getRoot().listTextures().map((texture) => {
      const [width, height] = texture.getSize() ?? [1024, 1024]
      const rate = resolution / bigger(width, height)

      // Dynamic import for front-end (process is undefined)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const sharp = require('sharp')
      return sharp(texture.getImage() as Uint8Array)
        .resize(width * rate, height * rate)
        .toBuffer()
        .then((webp: Buffer) => {
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
