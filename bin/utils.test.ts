import { outputExtension, exitWhenInvalidateExtension } from './utils'

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

describe('outputExtension', () => {
  context('when isJson is true', () => {
    it('returns .gltf', () => {
      expect(outputExtension({
        inputExtension: '.gltf',
        isJson: true,
        isBinary: false
      })).toBe('.gltf')
    })
  })

  context('when isBinary is true', () => {
    it('returns .glb', () => {
      expect(outputExtension({
        inputExtension: '.gltf',
        isJson: false,
        isBinary: true
      })).toBe('.glb')
    })
  })

  context('when isJson and isBinary are false', () => {
    it('returns inputExtension', () => {
      expect(outputExtension({
        inputExtension: '.gltf',
        isJson: false,
        isBinary: false
      })).toBe('.gltf')
    })
  })
})
