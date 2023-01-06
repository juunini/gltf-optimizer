import { Document, PropertyType } from '@gltf-transform/core'
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer'
import {
  draco,
  reorder,
  simplify,
  weld,
  prune,
  dedup
} from '@gltf-transform/functions'

export interface TransformOptions {
  draco: {
    method: 'edgebreaker' | 'sequential'
  }
  weld: {
    tolerance: number
  }
  simplify: {
    ratio: number
    error: number
  }
}

export async function transform (
  doc: Document,
  {
    draco: _draco,
    weld: _weld,
    simplify: _simplify
  }: TransformOptions
): Promise<Document> {
  await MeshoptEncoder.ready

  return await doc.transform(
    draco({ method: _draco.method }),
    weld({ tolerance: _weld.tolerance }),
    simplify({ simplifier: MeshoptSimplifier, ratio: _simplify.ratio, error: _simplify.error }),
    reorder({ encoder: MeshoptEncoder }),
    prune(),
    dedup({ propertyTypes: [PropertyType.MESH] })
  )
}
