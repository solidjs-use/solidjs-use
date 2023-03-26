import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useArrayDifference } from './index'

describe('useArrayDifference', () => {
  it('should be defined', () => {
    expect(useArrayDifference).to.be.exist
  })
  it('should return the difference of two array', () => {
    runHook(() => {
      const [list1, setList1] = createSignal([1, 2, 3, 4, 5])
      const [list2, setList2] = createSignal([4, 5, 6])

      const result = useArrayDifference(list1, list2)
      expect(result()).to.be.deep.eq([1, 2, 3])

      setList2([1, 2, 3])
      expect(result()).to.be.deep.eq([4, 5])

      setList1([1, 2, 3])
      expect(result()).to.be.deep.eq([])
    })
  })

  it('should return the difference of two array with iteratee', () => {
    runHook(() => {
      const [list1, setList1] = createSignal([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
      const [list2, setList2] = createSignal([{ id: 4 }, { id: 5 }])

      const result = useArrayDifference(list1, list2, (value, othVal) => value.id === othVal.id)
      expect(result()).to.be.deep.eq([{ id: 1 }, { id: 2 }, { id: 3 }])

      setList2([{ id: 1 }, { id: 2 }, { id: 3 }])
      expect(result()).to.be.deep.eq([{ id: 4 }, { id: 5 }])

      setList1([{ id: 1 }, { id: 2 }, { id: 3 }])
      expect(result()).to.be.deep.eq([])
    })
  })

  // key
  it('should return the difference of two array with key', () => {
    runHook(() => {
      const [list1, setList1] = createSignal([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
      const [list2, setList2] = createSignal([{ id: 3 }, { id: 4 }, { id: 5 }])

      const result = useArrayDifference(list1, list2, 'id')
      expect(result()).to.be.deep.eq([{ id: 1 }, { id: 2 }])

      setList2([{ id: 1 }, { id: 2 }])
      expect(result()).to.be.deep.eq([{ id: 3 }, { id: 4 }, { id: 5 }])

      setList1([{ id: 1 }, { id: 2 }])
      expect(result()).to.be.deep.eq([])
    })
  })
})
