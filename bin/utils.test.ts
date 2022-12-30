import { validateExtension } from './utils'

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
