import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useCeil } from '.'

describe('useCeil', () => {
  it('should be defined', () => {
    expect(useCeil).to.be.exist
  })
  it('should work', () => {
    runHook(() => {
      const [base, setBase] = createSignal(0.95)
      const result = useCeil(base)
      expect(result()).to.eq(1)
      setBase(-7.004)
      expect(result()).to.eq(-7)
    })
  })
})
