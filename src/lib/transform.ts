import { Document, PropertyType } from '@gltf-transform/core'
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer'
import {
  draco,
  reorder,
  simplify,
  weld,
  prune,
  dedup,
  resample
} from '@gltf-transform/functions'

import {
  DRACO_METHOD,
  SIMPLIFY,
  SIMPLIFY_ERROR,
  SIMPLIFY_RATIO,
  TEXTURE_RESIZE_FILTER,
  TEXTURE_RESIZE_RESOLUTION,
  WELD_TOLERANCE
} from '../constants'

export interface TransformOptions {
  draco?: {
    method?: 'edgebreaker' | 'sequential'
  }
  weld?: {
    tolerance?: number
  }
  simplify?: {
    enabled?: boolean
    ratio?: number
    error?: number
  }
  texture?: {
    resize?: {
      resolution?: number
      filter?: string
    }
  }
}

export async function transform (
  doc: Document,
  {
    draco: _draco,
    weld: _weld,
    simplify: _simplify,
    texture: _texture
  }: TransformOptions | undefined = {
    draco: { method: DRACO_METHOD },
    weld: { tolerance: WELD_TOLERANCE },
    simplify: {
      enabled: SIMPLIFY,
      ratio: SIMPLIFY_RATIO,
      error: SIMPLIFY_ERROR
    },
    texture: {
      resize: {
        resolution: TEXTURE_RESIZE_RESOLUTION,
        filter: TEXTURE_RESIZE_FILTER
      }
    }
  }
): Promise<Document> {
  await MeshoptEncoder.ready

  const functions = new Set([
    resample(),
    draco({ method: _draco?.method ?? DRACO_METHOD }),
    reorder({ encoder: MeshoptEncoder }),
    prune(),
    dedup({ propertyTypes: [PropertyType.MESH] })
  ])

  if (_simplify?.enabled ?? SIMPLIFY) {
    functions
      .add(weld({ tolerance: _weld?.tolerance ?? WELD_TOLERANCE }))
      .add(simplify({
        simplifier: MeshoptSimplifier,
        ratio: _simplify?.ratio ?? SIMPLIFY_RATIO,
        error: _simplify?.error ?? SIMPLIFY_ERROR
      }))
  }

  return await doc.transform(...Array.from(functions))
}
