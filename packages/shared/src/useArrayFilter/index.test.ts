import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useArrayFilter } from '../useArrayFilter'

describe('useArrayFilter', () => {
  it('should be defined', () => {
    expect(useArrayFilter).to.be.not.undefined
  })

  it('should work with array of Signals', () => {
    runHook(() => {
      const [item1] = createSignal(0)
      const [item2, setItem2] = createSignal(2)
      const [item3] = createSignal(4)
      const [item4] = createSignal(6)
      const [item5] = createSignal(8)
      const list = [item1, item2, item3, item4, item5]
      const result = useArrayFilter(list, i => i % 2 === 0)
      expect(result()).to.deep.equal([0, 2, 4, 6, 8])
      setItem2(1)
      expect(result()).to.deep.equal([0, 4, 6, 8])
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const [list, setList] = createSignal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      const result = useArrayFilter(list, i => i % 2 === 0)
      expect(result()).to.deep.equal([0, 2, 4, 6, 8])
      setList(([...state]) => {
        state.shift()
        return state
      })
      expect(result()).to.deep.equal([2, 4, 6, 8])
    })
  })
})
