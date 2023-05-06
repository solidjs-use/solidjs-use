import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { watchOnce } from '.'

describe('watchOnce', () => {
  it('should work', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const spy = cy.spy()

      watchOnce(num, spy)
      await nextTick()
      setNum(1)
      await nextTick()
      setNum(2)
      await nextTick()
      expect(spy).to.be.calledOnce
    })
  })
})
