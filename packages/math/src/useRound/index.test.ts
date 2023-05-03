import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { useRound } from '.'

describe('useRound', () => {
  it('should be defined', () => {
    expect(useRound).to.be.exist
  })
  it('should work', () => {
    runHook(() => {
      const [base, setBase] = createSignal(20.49)
      const result = useRound(base)
      expect(result()).to.eq(20)
      setBase(-20.51)
      expect(result()).to.eq(-21)
    })
  })
})
