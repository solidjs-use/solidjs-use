import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useArraySome } from '../useArraySome'

describe('useArraySome', () => {
  it('should be defined', () => {
    expect(useArraySome).to.be.not.undefined
  })

  it('should work with array of Signals', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal(0)
      const [item2] = createSignal(2)
      const [item3] = createSignal(4)
      const [item4] = createSignal(6)
      const [item5] = createSignal(8)
      const list = [item1, item2, item3, item4, item5]
      const result = useArraySome(list, i => i > 10)
      expect(result()).to.eq(false)
      setItem1(11)
      expect(result()).to.eq(true)
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const [list, setList] = createSignal([0, 2, 4, 6, 8])
      const result = useArraySome(list, i => i > 10)
      expect(result()).to.eq(false)
      setList(([...state]) => [...state, 11])
      expect(result()).to.eq(true)
    })
  })
})
