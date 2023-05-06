import { runHook } from '@dream2023/cypress-ct-solid-js'
import { useTimeout } from '../useTimeout'

describe('useTimeout', () => {
  it('works', () => {
    runHook(() => {
      const ready = useTimeout(10)
      expect(ready()).to.eq(false)
      setTimeout(() => expect(ready()).to.eq(true), 10)
    })
  })

  it('works with controls', () => {
    runHook(() => {
      const { ready } = useTimeout(10, { controls: true })
      expect(ready()).to.eq(false)
      setTimeout(() => expect(ready()).to.eq(true), 10)
    })
  })
})
