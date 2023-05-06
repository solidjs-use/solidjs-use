import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useMin } from '.'

describe('useMin', () => {
  it('should be defined', () => {
    expect(useMin).to.be.exist
  })

  it('should accept numbers', () => {
    runHook(() => {
      const v = useMin(50, 100)
      expect(v()).to.eq(50)
    })
  })

  it('should accept Signals', () => {
    runHook(() => {
      const [value1, setValue1] = createSignal(10)
      const [value2, setValue2] = createSignal(100)
      const [value3, setValue3] = createSignal(1000)

      const v = useMin(value1, value2, value3)
      expect(v()).to.eq(10)

      setValue1(8)
      expect(v()).to.eq(8)

      setValue2(7)
      expect(v()).to.eq(7)

      setValue3(6)
      expect(v()).to.eq(6)
    })
  })

  it('should accept numbers and Signals', () => {
    runHook(() => {
      const value1 = 10
      const [value2, setValue2] = createSignal(100)

      const v = useMin(50, value1, value2)

      expect(v()).to.eq(10)

      setValue2(0)
      expect(v()).to.eq(0)
    })
  })

  it('should accept single arg', () => {
    runHook(() => {
      const v = useMin(50)
      expect(v()).to.eq(50)
    })
  })

  it('should accept zero arg', () => {
    runHook(() => {
      const v = useMin()
      expect(v()).to.eq(Infinity)
    })
  })
})
