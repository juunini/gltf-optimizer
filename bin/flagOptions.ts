import { Options } from 'yargs'

export const flagOptions: Record<string, Options> = {
  input: {
    alias: 'i',
    describe: 'Path to the glTF or glb file.',
    type: 'string',
    normalize: true,
    demandOption: true
  },
  output: {
    alias: 'o',
    describe:
      'Output path of the glTF or glb file. Separate resources will be saved to the same directory.',
    type: 'string',
    normalize: true,
    default: './'
  },
  emissiveStrength: {
    describe: 'Emissive strength of the glTF file.',
    type: 'number',
    default: 1.0
  },
  'draco.method': {
    choices: ['edgebreaker', 'sequential'],
    default: 'edgebreaker'
  },
  'weld.tolerance': {
    describe: 'Tolerance, as a fraction of primitive AABB, used when merging similar vertices.',
    type: 'number',
    default: 0.0001
  },
  'simplify.ratio': {
    describe: 'Target ratio (0-1) of vertices to keep.',
    type: 'number',
    default: 0.75
  },
  'simplify.error': {
    describe: 'Limit on error, as a fraction of mesh radius.',
    type: 'number',
    default: 0.01
  },
  'texture.resize.resolution': {
    describe: 'Maximum width/height to enforce, preserving aspect ratio. For example, a 4096x8192 texture, resized with limit [2048, 2048] will be reduced to 1024x2048.',
    type: 'number',
    default: 1024
  },
  'texture.resize.filter': {
    describe: 'Resampling filter method. LANCZOS3 is sharper, LANCZOS2 is smoother.',
    choices: ['LANCZOS2', 'LANCZOS3'],
    default: 'LANCZOS3'
  }
}
