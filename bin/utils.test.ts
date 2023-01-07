import { outputDirectory } from './utils'

jest.mock('fs')

describe('outputDirectory', () => {
  context('when given output is undefined', () => {
    it('returns .', () => {
      expect(outputDirectory({})).toBe('.')
    })
  })

  context('when given output is empty string', () => {
    it('returns .', () => {
      expect(outputDirectory({ output: '' })).toBe('.')
    })
  })

  context('when given output is .', () => {
    it('returns .', () => {
      expect(outputDirectory({ output: '.' })).toBe('.')
    })
  })

  context('when given output is ./', () => {
    it('returns .', () => {
      expect(outputDirectory({ output: './' })).toBe('.')
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

  context('when given output is root directory', () => {
    it('returns basename of output', () => {
      expect(outputDirectory({ output: '/test.gltf' })).toBe('/')
    })
  })

  context('when given output is from root directory', () => {
    it('returns basename of output', () => {
      expect(outputDirectory({ output: '/test/test.gltf' })).toBe('/test')
    })
  })
})
