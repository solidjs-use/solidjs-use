import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useArrayReduce } from '../useArrayReduce'

describe('useArrayReduce', () => {
  it('should be defined', () => {
    expect(useArrayReduce).to.be.not.undefined
  })

  it('should calculate the array sum', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal(1)
      const [item2, setItem2] = createSignal(2)
      const sum = useArrayReduce([item1, item2, 3], (a, b) => a + b)
      expect(sum()).to.eq(6)

      setItem1(4)
      expect(sum()).to.eq(9)

      setItem2(3)
      expect(sum()).to.eq(10)
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const list = createMutable([1, 2])
      const sum = useArrayReduce(list, (a, b) => a + b)
      expect(sum()).to.eq(3)

      list.push(3)
      expect(sum()).to.eq(6)
    })
  })

  it('should work with initialValue', () => {
    runHook(() => {
      const list = createMutable([{ num: 1 }, { num: 2 }])
      const sum = useArrayReduce(list, (sum, val) => sum + val.num, 0 as number)
      expect(sum()).to.eq(3)

      list.push({ num: 3 })
      expect(sum()).to.eq(6)
    })
  })
})
