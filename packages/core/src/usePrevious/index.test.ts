import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { usePrevious } from '.'

describe('usePrevious', () => {
  it('works for literals', () => {
    return runAsyncHook(async () => {
      const [target, setTarget] = createSignal(1)
      const previous = usePrevious(target)
      await nextTick()
      expect(previous()).to.be.eq(undefined)

      setTarget(2)
      await nextTick()
      expect(previous()).to.be.eq(1)

      setTarget(10)

      await nextTick()
      expect(previous()).to.be.eq(2)
    })
  })

  it('works with initial value', () => {
    return runAsyncHook(async () => {
      const [target, setTarget] = createSignal('Hello')
      const previous = usePrevious(target, 'initial')

      await nextTick()
      expect(previous()).to.be.eq('initial')

      setTarget('World')

      await nextTick()
      expect(previous()).to.be.eq('Hello')
    })
  })

  it('works with object', () => {
    return runAsyncHook(async () => {
      const [target, setTarget] = createSignal<any>({ a: 1 })
      const previous = usePrevious(target)

      await nextTick()
      expect(previous()).to.be.eq(undefined)

      setTarget({ b: 2 })

      await nextTick()
      expect(previous()).to.be.deep.eq({ a: 1 })
    })
  })
})
