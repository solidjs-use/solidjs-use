import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { watchAtMost } from '.'

describe('watchAtMost', () => {
  it('should work', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const spy = cy.spy()

      const { count } = watchAtMost(num, spy, {
        count: 2
      })
      await nextTick()
      setNum(1)
      await nextTick()
      setNum(2)
      await nextTick()
      setNum(3)
      await nextTick()
      expect(spy).to.be.callCount(2)
      expect(count()).to.be.eq(2)
    })
  })
})
