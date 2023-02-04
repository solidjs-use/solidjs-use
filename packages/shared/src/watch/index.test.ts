import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { watch } from '.'

describe('watch', () => {
  it('should work ', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const spy = cy.spy()
      watch(num, spy)

      await nextTick()
      expect(spy).calledWith(0)

      setNum(1)
      await nextTick()
      expect(spy).calledWith(1)

      stop()
      setNum(2)
      expect(spy).calledWith(2)
    })
  })

  it('should work when defer is true', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const spy = cy.spy()
      watch(num, spy, { defer: true })

      await nextTick()
      expect(spy).not.be.called

      setNum(1)
      await nextTick()
      expect(spy).calledWith(1)
    })
  })
})
