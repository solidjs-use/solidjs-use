import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useSum } from '.'

describe('useSum', () => {
  it('should be defined', () => {
    expect(useSum).to.be.exist
  })

  it('array usage', () => {
    runHook(() => {
      const [array, setArray] = createSignal([1, 2, 3, 4])
      const sum = useSum(array)
      expect(sum()).to.eq(10)
      setArray([-1, -2, 3, 4])
      expect(sum()).to.eq(4)
    })
  })

  it('rest usage', () => {
    runHook(() => {
      const [a] = createSignal(1)
      const [b, setB] = createSignal(2)
      const sum = useSum(a, () => b(), 3)
      expect(sum()).to.eq(6)
      setB(3)
      expect(sum()).to.eq(7)
    })
  })
})
