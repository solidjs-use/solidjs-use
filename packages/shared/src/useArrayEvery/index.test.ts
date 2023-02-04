import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useArrayEvery } from '../useArrayEvery'

describe('useArrayEvery', () => {
  it('should be defined', () => {
    expect(useArrayEvery).to.be.not.undefined
  })

  it('should work with array of Signals', () => {
    runHook(() => {
      const [item1, setItem1] = createSignal(0)
      const [item2] = createSignal(2)
      const [item3] = createSignal(4)
      const [item4] = createSignal(6)
      const [item5] = createSignal(8)
      const list = [item1, item2, item3, item4, item5]
      const result = useArrayEvery(list, i => i % 2 === 0)
      expect(result()).to.deep.equal(true)
      setItem1(1)
      expect(result()).to.deep.equal(false)
    })
  })

  it('should work with reactive array', () => {
    runHook(() => {
      const [list, setList] = createSignal([0, 2, 4, 6, 8])
      const result = useArrayEvery(list, i => i % 2 === 0)
      expect(result()).to.deep.equal(true)
      setList(([...state]) => {
        state.push(9)
        return state
      })
      expect(result()).to.deep.equal(false)
    })
  })
})
