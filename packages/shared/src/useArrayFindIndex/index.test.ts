import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useArrayFindIndex } from '.'

describe('useArrayFindIndex', () => {
  it('should be defined', () => {
    expect(useArrayFindIndex).to.be.not.undefined
  })

  it('should work with array of Signals', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal(0)
      const [item2, setItem2] = createSignal(2)
      const [item3, setItem3] = createSignal(4)
      const [item4, setItem4] = createSignal(6)
      const [item5, setItem5] = createSignal(8)
      const list = [item1, item2, item3, item4, item5]
      const result = useArrayFindIndex(list, i => i % 2 === 0)
      expect(result()).to.eq(0)
      setItem1(1)
      expect(result()).to.eq(1)
      setItem2(3)
      expect(result()).to.eq(2)
      setItem3(5)
      expect(result()).to.eq(3)
      setItem4(7)
      expect(result()).to.eq(4)
      setItem5(9)
      expect(result()).to.eq(-1)
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const [list, setList] = createSignal([0, 2, 4, 6, 8])
      const result = useArrayFindIndex(list, i => i % 2 === 0)
      expect(result()).to.eq(0)
      setList(([...state]) => {
        state.unshift(-1)
        return state
      })
      expect(result()).to.eq(1)
    })
  })
})
