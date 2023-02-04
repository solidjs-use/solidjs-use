import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useFloor } from '.'

describe('useFloor', () => {
  it('should be defined', () => {
    expect(useFloor).to.be.exist
  })
  it('should work', () => {
    runHook(() => {
      const [base, setBase] = createSignal(45.95)
      const result = useFloor(base)
      expect(result()).to.eq(45)
      setBase(-45.05)
      expect(result()).to.eq(-46)
    })
  })
})
