import { createSignal } from 'solid-js'
import { useArrayIncludes } from './index'

describe('useArrayIncludes', () => {
  it('should be defined', () => {
    expect(useArrayIncludes).to.be.exist
  })

  it('should work with array of refs', () => {
    const [array, setArray] = createSignal([0, 2, 4, 6])
    const result = useArrayIncludes(array, 8)
    expect(result()).to.be.false
    setArray(([...arr]) => {
      arr.push(8)
      return arr
    })
    expect(result()).to.be.true
    setArray(([...arr]) => {
      arr.pop()
      return arr
    })
    expect(result()).to.be.false
  })

  it('should work with array of refs and comparator', () => {
    const [array, setArray] = createSignal([{ id: 1 }, { id: 2 }, { id: 3 }])
    const result = useArrayIncludes(array, 3, 'id')
    expect(result()).to.be.true
    setArray(([...arr]) => {
      arr.pop()
      return arr
    })
    expect(result()).to.be.false
  })

  it('should work with array of refs and comparatorFn', () => {
    const [array, setArray] = createSignal([{ id: 1 }, { id: 2 }, { id: 3 }])
    const result = useArrayIncludes(array, { id: 3 }, (element, value) => element.id === value.id)
    expect(result()).to.be.true
    setArray(([...arr]) => {
      arr.pop()
      return arr
    })
    expect(result()).to.be.false
  })

  it('should work with array of refs and fromIndex', () => {
    const [array] = createSignal([{ id: 1 }, { id: 2 }, { id: 3 }])
    const result = useArrayIncludes(
      array,
      { id: 1 },
      { fromIndex: 1, comparator: (element, value) => element.id === value.id }
    )
    expect(result()).to.be.false
  })
})
