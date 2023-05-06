import { runHook } from '@dream2023/cypress-ct-solid-js'
import { createSignal } from 'solid-js'
import { createProjection } from '.'

describe('createProjection', () => {
  it('should be defined', () => {
    expect(createProjection).to.be.exist
  })

  it('should work with projector', () => {
    runHook(() => {
      const [fromStart] = createSignal(0)
      const [fromEnd, setFromEnd] = createSignal(10)
      const [toRange, setToRange] = createSignal<[number, number]>([50, 100])

      const useProjector = createProjection(() => [fromStart(), fromEnd()], toRange)
      const [input, setInput] = createSignal(0)
      const output = useProjector(input)

      expect(output()).to.eq(50)

      setInput(10)
      expect(output()).to.eq(100)

      setInput(5)
      expect(output()).to.eq(75)

      setInput(1)
      expect(output()).to.eq(55)

      setFromEnd(20)
      expect(output()).to.eq(52.5)

      setToRange([80, 120])
      expect(output()).to.eq(82)
    })
  })
})
