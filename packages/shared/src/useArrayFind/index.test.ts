import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useArrayFind } from '../useArrayFind'

describe('useArrayFind', () => {
  it('should be defined', () => {
    expect(useArrayFind).to.be.not.undefined
  })

  it('should find positive', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal(1)
      const [item2, setItem2] = createSignal(2)
      const [item3, setItem3] = createSignal(3)
      const positive = useArrayFind([item1, item2, item3], val => val > 0)
      expect(positive()).to.eq(1)
      setItem1(-1)
      expect(positive()).to.eq(2)
      setItem2(-1)
      expect(positive()).to.eq(3)
      setItem3(-1)
      expect(positive()).to.eq(undefined)
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const list = createMutable([-1, -2])
      const positive = useArrayFind(list, val => val > 0)
      expect(positive()).to.eq(undefined)
      list.push(1)
      expect(positive()).to.eq(1)
    })
  })
})
