import { getOutputExtension, validateExtension } from './utils'

describe('validateExtension', () => {
  context('when extension is .gltf or .glb', () => {
    it('nothing to happened', () => {
      expect(validateExtension('.gltf')).toBeUndefined()
      expect(validateExtension('.glb')).toBeUndefined()
    })
  })

  context('when extension is not .gltf or .glb', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined as never)

    it('calls process.exit', () => {
      validateExtension('.txt')

      expect(consoleSpy).toBeCalled()
      expect(exitSpy).toBeCalled()
    })
  })
})

describe('getOutputExtension', () => {
  context('when isJson is true', () => {
    it('returns .gltf', () => {
      expect(getOutputExtension({
        inputExtension: '.gltf',
        isJson: true,
        isBinary: false
      })).toBe('.gltf')
    })
  })

  context('when isBinary is true', () => {
    it('returns .glb', () => {
      expect(getOutputExtension({
        inputExtension: '.gltf',
        isJson: false,
        isBinary: true
      })).toBe('.glb')
    })
  })

  context('when isJson and isBinary are false', () => {
    it('returns inputExtension', () => {
      expect(getOutputExtension({
        inputExtension: '.gltf',
        isJson: false,
        isBinary: false
      })).toBe('.gltf')
    })
  })
})
