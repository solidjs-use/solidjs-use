import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useArrayFindLast } from '../useArrayFindLast'

describe('useArrayFindLast', () => {
  it('should be defined', () => {
    expect(useArrayFindLast).to.be.exist
  })

  it('should find positive', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal(1)
      const [item2, setItem2] = createSignal(2)
      const [item3, setItem3] = createSignal(3)
      const positive = useArrayFindLast([item1, item2, item3], val => val > 0)
      expect(positive()).to.be.eq(3)
      setItem3(-1)
      expect(positive()).to.be.eq(2)
      setItem2(-1)
      expect(positive()).to.be.eq(1)
      setItem1(-1)
      expect(positive()).to.be.eq(undefined)
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const list = createMutable([-1, -2])
      const positive = useArrayFindLast(list, val => val > 0)
      expect(positive()).to.be.eq(undefined)
      list.push(10)
      expect(positive()).to.be.eq(10)
      list.push(5)
      expect(positive()).to.be.eq(5)
    })
  })
})
