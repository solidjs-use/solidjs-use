import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useArrayMap } from '../useArrayMap'

describe('useArrayMap', () => {
  it('should be defined', () => {
    expect(useArrayMap).to.be.not.undefined
  })

  it('should work with array of Signals', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal(0)
      const [item2] = createSignal(2)
      const [item3] = createSignal(4)
      const [item4] = createSignal(6)
      const [item5] = createSignal(8)
      const list = [item1, item2, item3, item4, item5]
      const result = useArrayMap(list, i => i * 2)
      expect(result()).to.deep.equal([0, 4, 8, 12, 16])
      setItem1(1)
      expect(result()).to.deep.equal([2, 4, 8, 12, 16])
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const [list, setList] = createSignal([0, 1, 2, 3, 4])
      const result = useArrayMap(list, i => i * 2)
      expect(result()).to.deep.equal([0, 2, 4, 6, 8])
      setList(([...state]) => {
        state.pop()
        return state
      })
      expect(result()).to.deep.equal([0, 2, 4, 6])
    })
  })

  it('should match the return type of mapper function', () => {
    runHook(() => {
      const [list] = createSignal([0, 1, 2, 3])
      const result1 = useArrayMap(list, i => i.toString())
      result1().forEach(i => expect(i).to.be.a('string'))

      const result2 = useArrayMap(list, i => ({ value: i }))
      result2().forEach((item, idx) => {
        expect(item).to.be.a('object')
        expect(item).to.have.property('value', idx)
      })
    })
  })
})
