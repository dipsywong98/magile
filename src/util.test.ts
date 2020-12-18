import { reorderInPlace } from './utils'

describe('utils', () => {
  describe('reorderInPlace', () => {
    it('example', () => {
      const array = [0,1,2,3,4,5,6,7,8]
      reorderInPlace(array, 3,7)
      expect(array).toEqual([0,1,2,4,5,6,7,3,8])
    })
  })
})
