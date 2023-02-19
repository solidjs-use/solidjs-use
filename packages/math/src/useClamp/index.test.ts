import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useClamp } from '.'

describe('useClamp', () => {
  it('should be defined', () => {
    expect(useClamp).to.be.exist
  })

  it('should be initial value', () => {
    runHook(() => {
      const [v] = useClamp(10, 0, 100)
      expect(v()).to.eq(10)
    })
  })

  it('should be max', () => {
    runHook(() => {
      const [value, setValue] = createSignal(10)
      const [min] = createSignal(0)
      const [max, setMax] = createSignal(100)

      const [v, setV] = useClamp([value, setValue], min, max)

      expect(v()).to.eq(10)

      setV(1000)
      expect(v()).to.eq(100)

      setMax(90)
      expect(v()).to.eq(90)

      setMax(100)
      expect(v()).to.eq(100)
    })
  })

  it('should be min', () => {
    runHook(() => {
      const [value, setValue] = createSignal(10)
      const [min, setMin] = createSignal(0)
      const [max] = createSignal(100)

      const [v, setV] = useClamp([value, setValue], min, max)

      expect(v()).to.eq(10)

      setV(-10)
      expect(v()).to.eq(0)

      setMin(20)
      expect(v()).to.eq(20)

      setMin(-10)
      setV(-100)
      expect(v()).to.eq(-10)
    })
  })

  it('should work with plain number', () => {
    runHook(() => {
      const [min, setMin] = createSignal(0)
      const [max] = createSignal(100)

      const [v, setV] = useClamp(10, min, max)

      expect(v()).to.eq(10)

      setV(-10)
      expect(v()).to.eq(0)

      setMin(20)
      expect(v()).to.eq(20)

      setMin(-10)
      setV(-100)
      expect(v()).to.eq(-10)
    })
  })

  it('should work with Accessor', () => {
    runHook(() => {
      const [base, setBase] = createSignal(10)
      const [min] = createSignal(0)
      const [max] = createSignal(100)

      const v = useClamp(base, min, max)

      expect(v()).to.eq(10)

      setBase(-10)
      expect(v()).to.eq(0)

      setBase(110)
      expect(v()).to.eq(100)
    })
  })
})
