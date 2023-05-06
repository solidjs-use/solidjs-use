import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useMath } from '.'

describe('useMath', () => {
  it('should be defined', () => {
    expect(useMath).to.be.exist
  })

  it('should accept numbers', () => {
    runHook(() => {
      const v = useMath('pow', 2, 3)
      expect(v()).to.eq(8)
    })
  })

  it('should accept Signals', () => {
    runHook(() => {
      const [base] = createSignal(2)
      const [exponent] = createSignal(3)
      const result = useMath('pow', base, exponent)

      expect(result()).to.eq(8)

      const [num, setNum] = createSignal(4)
      const root = useMath('sqrt', num)

      expect(root()).to.eq(2)

      setNum(16)
      expect(root()).to.eq(4)
    })
  })
})
