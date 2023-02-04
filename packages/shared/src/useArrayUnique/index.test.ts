import { createSignal } from 'solid-js'
import { useArrayUnique } from '../useArrayUnique'

describe('useArraySome', () => {
  it('should be defined', () => {
    expect(useArrayUnique).to.be.exist
  })

  it('should work with array of accessors', () => {
    const [item1] = createSignal(0)
    const [item2] = createSignal(1)
    const [item3] = createSignal(1)
    const [item4] = createSignal(2)
    const [item5, setItem5] = createSignal(3)
    const list = [item1, item2, item3, item4, item5]
    const result = useArrayUnique(list)
    expect(result().length).to.eq(4)
    setItem5(2)
    expect(result().length).to.eq(3)
  })

  it('should work with reactive array', () => {
    const [list, setList] = createSignal([1, 2, 2, 3])
    const result = useArrayUnique(list)
    expect(result().length).to.eq(3)
    setList(list => [...list, 1])
    expect(result().length).to.eq(3)
  })
})
