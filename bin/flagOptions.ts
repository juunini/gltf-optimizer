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
  }
}
