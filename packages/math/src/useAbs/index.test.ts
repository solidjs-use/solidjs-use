import { runHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { useAbs } from '.'

describe('useAbs', () => {
  it('should be defined', () => {
    expect(useAbs).to.be.exist
  })

  it('this should work', () => {
    runHook(() => {
      const [original, setOriginal] = createSignal(-1)
      const abs = useAbs(original)

      expect(abs()).to.eq(1)

      setOriginal(-23)
      expect(abs()).to.eq(23)

      setOriginal(10)
      expect(abs()).to.eq(10)

      setOriginal(0)
      expect(abs()).to.eq(0)
    })
  })

  it('getter', () => {
    runHook(() => {
      const [original, setOriginal] = createSignal(-1)
      const abs = useAbs(() => original())

      expect(abs()).to.eq(1)

      setOriginal(-23)
      expect(abs()).to.eq(23)

      setOriginal(10)
      expect(abs()).to.eq(10)

      setOriginal(0)
      expect(abs()).to.eq(0)
    })
  })
})
