import fs from 'fs'
import fsExtra from 'fs-extra'

import {
  outputExtension,
  exitWhenInvalidateExtension,
  dracoOptions,
  inputExtension,
  inputIsBinary,
  outputIsBinary,
  outputDirectory,
  inputName,
  replaceTextImageToWebP,
  removeAllWithoutExtension
} from './utils'

jest.mock('fs')
jest.mock('fs-extra')

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

describe('inputName', () => {
  it('returns input name', () => {
    expect(inputName({
      input: 'test.gltf'
    })).toBe('test')
  })
})

describe('outputDirectory', () => {
  context('when given output is undefined', () => {
    it('returns .', () => {
      expect(outputDirectory({})).toBe('.')
    })
  })

  context('when given output is a directory', () => {
    it('returns output', () => {
      expect(outputDirectory({ output: 'test' })).toBe('test')
    })
  })

  context('when given output is a file', () => {
    it('returns dirname of output', () => {
      expect(outputDirectory({ output: 'test/test.gltf' })).toBe('test')
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

describe('replaceTextImageToWebP', () => {
  const givenFileContents = 'image/png\ntest.png'
  const givenFileName = 'test.gltf'
  const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined as never);
  (fs.readFileSync as jest.Mock) = jest.fn(() => givenFileContents)

  it('replace png to webp in file', () => {
    replaceTextImageToWebP(givenFileName)

    expect(writeFileSyncSpy).toBeCalledWith(givenFileName, givenFileContents.replaceAll('png', 'webp'))
  })
})

describe('removeAllWithoutExtension', () => {
  (fs.readdirSync as jest.Mock) = jest.fn(() => ['test.gltf', 'test.glb'])
  const removeSyncSpy = jest.spyOn(fsExtra, 'removeSync').mockImplementation(() => undefined as never)

  it('remove all files except glb', () => {
    removeAllWithoutExtension('output', '.glb')

    expect(removeSyncSpy).toBeCalledWith('output/test.gltf')
  })
})
