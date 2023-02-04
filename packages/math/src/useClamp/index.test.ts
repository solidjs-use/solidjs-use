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

      const [v] = useClamp(value, min, max)

      expect(v()).to.eq(10)

      setValue(1000)
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

      const [v] = useClamp(value, min, max)

      expect(v()).to.eq(10)

      setValue(-10)
      expect(v()).to.eq(0)

      setMin(20)
      expect(v()).to.eq(20)

      setMin(-10)
      setValue(-100)
      expect(v()).to.eq(-10)
    })
  })
})
