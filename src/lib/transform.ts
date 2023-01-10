import { Document, PropertyType } from '@gltf-transform/core'
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer'
import {
  draco,
  reorder,
  simplify,
  weld,
  prune,
  dedup,
  webp,
  resample,
  textureResize,
  TextureResizeFilter
} from '@gltf-transform/functions'
import { DRACO_METHOD, SIMPLIFY_ERROR, SIMPLIFY_RATIO, TEXTURE_RESIZE_FILTER, TEXTURE_RESIZE_RESOLUTION, WELD_TOLERANCE } from '../constants'

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
  texture?: {
    resize?: {
      resolution?: number
      filter?: string
    }
  }
}

export async function transform (
  doc: Document,
  isNode: boolean,
  {
    draco: _draco,
    weld: _weld,
    simplify: _simplify,
    texture: _texture
  }: TransformOptions | undefined = {
    draco: { method: DRACO_METHOD },
    weld: { tolerance: WELD_TOLERANCE },
    simplify: { ratio: SIMPLIFY_RATIO, error: SIMPLIFY_ERROR },
    texture: {
      resize: {
        resolution: TEXTURE_RESIZE_RESOLUTION,
        filter: TEXTURE_RESIZE_FILTER
      }
    }
  }
): Promise<Document> {
  await MeshoptEncoder.ready

  return await doc.transform(
    resample(),
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
    isNode
      ? textureResize({
        size: [
          _texture?.resize?.resolution ?? TEXTURE_RESIZE_RESOLUTION,
          _texture?.resize?.resolution ?? TEXTURE_RESIZE_RESOLUTION
        ],
        filter: ['LANCZOS2', 'lanczos2'].includes(_texture?.resize?.filter ?? '')
          ? TextureResizeFilter.LANCZOS2
          : TextureResizeFilter.LANCZOS3
      })
      : () => {},
    isNode ? webp({ squoosh: require('@squoosh/lib') }) : () => {}
  )
}
