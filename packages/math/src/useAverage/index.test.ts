import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useAverage } from '.'

describe('useAverage', () => {
  it('should be defined', () => {
    expect(useAverage).to.be.exist
  })

  it('should be the average', () => {
    runHook(() => {
      const [arr, setArr] = createSignal([1, 2, 3])

      const v = useAverage(arr)

      expect(v()).to.eq(2)

      setArr([4, 5, 6])
      expect(v()).to.eq(5)
    })
  })

  it('should be the average when some are Accessor', () => {
    runHook(() => {
      const [a, seta] = createSignal(2)
      const [arr] = createSignal([1, a, 9])

      const v = useAverage(arr)

      expect(v()).to.eq(4)

      seta(8)
      expect(v()).to.eq(6)
    })
  })

  it('should be the average when some items are getter', () => {
    runHook(() => {
      const [a, seta] = createSignal(1)
      const [arr] = createSignal([1, () => a() + 1, 9])

      const v = useAverage(arr)

      expect(v()).to.eq(4)

      seta(7)
      expect(v()).to.eq(6)
    })
  })

  it('should be the average when the array is a getter', () => {
    runHook(() => {
      const [arr] = createSignal([1, 2, 3])
      const [last, setLast] = createSignal(0)

      const v = useAverage(() => arr().concat(last()))

      expect(v()).to.eq(1.5)

      setLast(10)
      expect(v()).to.eq(4)
    })
  })

  it('should work with rest', () => {
    runHook(() => {
      const [a, seta] = createSignal(1)
      const [b, setB] = createSignal(2)
      const sum = useAverage(a, () => b(), 3)
      expect(sum()).to.eq(2)
      setB(11)
      expect(sum()).to.eq(5)
      seta(10)
      expect(sum()).to.eq(8)
    })
  })
})
