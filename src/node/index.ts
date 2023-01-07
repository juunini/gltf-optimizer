import type { TransformOptions } from '../lib/transform'

import { setEmissiveStrength } from '../lib/setEmissiveStrength'
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
  await transform(doc, true, options?.transform)

  return await io.writeBinary(doc)
}
