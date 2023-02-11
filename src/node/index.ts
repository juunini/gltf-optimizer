import type { TransformOptions } from '../lib/transform'

import { setEmissiveStrength } from '../lib/setEmissiveStrength'
import { convertTextureWebP } from './convertTextureWebP'
import { nodeIO } from './nodeIO'
import { transform } from '../lib/transform'

interface Options {
  emissiveStrength?: number
  transform?: TransformOptions
}

export async function node (glb: Uint8Array, options?: Options): Promise<Uint8Array> {
  const io = await nodeIO()
  const doc = await io.readBinary(glb)

  setEmissiveStrength(doc, options?.emissiveStrength)
  await convertTextureWebP(doc, options?.transform?.texture?.resize?.resolution)
  await transform(doc, options?.transform)

  return await io.writeBinary(doc)
}
