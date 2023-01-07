import { Document, PropertyType } from '@gltf-transform/core'
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer'
import {
  draco,
  reorder,
  simplify,
  weld,
  prune,
  dedup,
  webp
} from '@gltf-transform/functions'
import { DRACO_METHOD, SIMPLIFY_ERROR, SIMPLIFY_RATIO, WELD_TOLERANCE } from '../constants'

export interface TransformOptions {
  draco?: {
    method?: 'edgebreaker' | 'sequential'
  }
  weld?: {
    tolerance?: number
  }
  simplify?: {
    ratio?: number
    error?: number
  }
}

export async function transform (
  doc: Document,
  isNode: boolean,
  {
    draco: _draco,
    weld: _weld,
    simplify: _simplify
  }: TransformOptions | undefined = {
    draco: { method: DRACO_METHOD },
    weld: { tolerance: WELD_TOLERANCE },
    simplify: { ratio: SIMPLIFY_RATIO, error: SIMPLIFY_ERROR }
  }
): Promise<Document> {
  await MeshoptEncoder.ready

  return await doc.transform(
    draco({ method: _draco?.method ?? DRACO_METHOD }),
    weld({ tolerance: _weld?.tolerance ?? WELD_TOLERANCE }),
    simplify({
      simplifier: MeshoptSimplifier,
      ratio: _simplify?.ratio ?? SIMPLIFY_RATIO,
      error: _simplify?.error ?? SIMPLIFY_ERROR
    }),
    reorder({ encoder: MeshoptEncoder }),
    prune(),
    dedup({ propertyTypes: [PropertyType.MESH] }),
    isNode ? webp({ squoosh: require('@squoosh/lib') }) : () => {}
  )
}
