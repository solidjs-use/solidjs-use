import { runHook } from '@dream2023/cypress-solidjs'
import { toValue } from '@solidjs-use/shared'
import { isAccessor } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { useProjection } from '.'

describe('useProjection', () => {
  it('should be defined', () => {
    expect(useProjection).to.be.exist
  })

  it('returns a Accessor', () => {
    runHook(() => {
      const [val] = createSignal(5)
      expect(toValue(isAccessor(useProjection(val, [0, 10], [0, 100])))).to.eq(true)
    })
  })

  it('projects correctly', () => {
    runHook(() => {
      expect(toValue(useProjection(5, [0, 10], [0, 100]))).to.eq(50)
      expect(toValue(useProjection(3, [0, 10], [0, 100]))).to.eq(30)
      expect(toValue(useProjection(4, [0, 44], [0, 132]))).to.eq(12)
    })
  })

  it('is reactive', () => {
    runHook(() => {
      const [input, setInput] = createSignal(5)
      const projection = useProjection(input, [0, 10], [0, 100])
      expect(isAccessor(projection)).to.eq(true)

      expect(projection()).to.eq(50)

      setInput(8)
      expect(projection()).to.eq(80)

      setInput(2.3)
      expect(projection()).to.eq(23)
    })
  })

  it('works with getter functions', () => {
    runHook(() => {
      expect(toValue(useProjection(() => 5, [0, 10], [0, 100]))).to.eq(50)
      expect(toValue(useProjection(() => 3, [0, 10], [0, 100]))).to.eq(30)
      expect(toValue(useProjection(() => 4, [0, 44], [0, 132]))).to.eq(12)
    })
  })
})
