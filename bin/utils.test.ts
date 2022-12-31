// @ts-expect-error
import gltfPipeline from 'gltf-pipeline'

import {
  outputExtension,
  exitWhenInvalidateExtension,
  dracoOptions,
  inputExtension,
  runOption,
  inputIsBinary,
  outputIsBinary,
  outputDirectory
} from './utils'

describe('exitWhenInvalidateExtension', () => {
  context('when extension is .gltf or .glb', () => {
    it('nothing to happened', () => {
      expect(exitWhenInvalidateExtension('.gltf')).toBeUndefined()
      expect(exitWhenInvalidateExtension('.glb')).toBeUndefined()
    })
  })

  context('when extension is not .gltf or .glb', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined as never)

    it('calls process.exit', () => {
      exitWhenInvalidateExtension('.txt')

      expect(consoleSpy).toBeCalled()
      expect(exitSpy).toBeCalled()
    })
  })
})

describe('outputDirectory', () => {
  context('when given output is undefined', () => {
    it('returns .', () => {
      expect(outputDirectory()).toBe('.')
    })
  })

  context('when given output is a directory', () => {
    it('returns output', () => {
      expect(outputDirectory('test')).toBe('test')
    })
  })

  context('when given output is a file', () => {
    it('returns dirname of output', () => {
      expect(outputDirectory('test/test.gltf')).toBe('test')
    })
  })
})

describe('inputExtension', () => {
  it('returns .gltf', () => {
    expect(inputExtension({
      input: 'test.gltf'
    })).toBe('.gltf')
  })

  it('returns .glb', () => {
    expect(inputExtension({
      input: 'test.glb'
    })).toBe('.glb')
  })
})

describe('outputExtension', () => {
  context('when json is true', () => {
    it('returns .gltf', () => {
      expect(outputExtension({
        input: 'test.gltf',
        json: true,
        binary: false
      })).toBe('.gltf')
    })
  })

  context('when binary is true', () => {
    it('returns .glb', () => {
      expect(outputExtension({
        input: 'test.gltf',
        json: false,
        binary: true
      })).toBe('.glb')
    })
  })

  context('when json and binary are false', () => {
    it('returns inputExtension', () => {
      expect(outputExtension({
        input: 'test.gltf',
        json: false,
        binary: false
      })).toBe('.gltf')
    })
  })
})

describe('dracoOptions', () => {
  context('when compressMeshes is false', () => {
    it('returns undefined', () => {
      expect(dracoOptions({
        draco: {
          compressMeshes: false
        }
      })).toBeUndefined()
    })
  })

  context('when compressMeshes is true', () => {
    it('returns draco', () => {
      expect(dracoOptions({
        draco: {
          compressMeshes: true
        }
      })).toEqual({
        compressMeshes: true
      })
    })
  })
})

describe('inputIsBinary', () => {
  context('when inputExtension is .glb', () => {
    it('returns true', () => {
      expect(inputIsBinary({
        input: 'test.glb'
      })).toBeTruthy()
    })
  })

  context('when inputExtension is not .glb', () => {
    it('returns false', () => {
      expect(inputIsBinary({
        input: 'test.gltf'
      })).toBeFalsy()
    })
  })
})

describe('outputIsBinary', () => {
  context('when outputExtension is .glb', () => {
    it('returns true', () => {
      expect(outputIsBinary({
        input: 'test.gltf',
        binary: true
      })).toBeTruthy()
    })
  })

  context('when outputExtension is not .glb', () => {
    it('returns false', () => {
      expect(outputIsBinary({
        input: 'test.gltf',
        binary: false
      })).toBeFalsy()
    })
  })
})

describe('runOption', () => {
  context('when input and output is binary', () => {
    it('returns processGlb', () => {
      expect(runOption({
        input: 'test.glb',
        binary: true
      })).toBe(gltfPipeline.processGlb)
    })
  })

  context('when input is binary and output is not binary', () => {
    it('returns glbToGltf', () => {
      expect(runOption({
        input: 'test.glb',
        json: true
      })).toBe(gltfPipeline.glbToGltf)
    })
  })

  context('when input is not binary and output is binary', () => {
    it('returns gltfToGlb', () => {
      expect(runOption({
        input: 'test.gltf',
        binary: true
      })).toBe(gltfPipeline.gltfToGlb)
    })
  })

  context('when input and output is not binary', () => {
    it('returns processGltf', () => {
      expect(runOption({
        input: 'test.gltf',
        json: true
      })).toBe(gltfPipeline.processGltf)
    })
  })
})
