import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { promiseTimeout } from '../utils'
import { throttledWatch, watchThrottled } from '.'

describe('watchThrottled', () => {
  it('should export module', () => {
    expect(watchThrottled).to.be.exist
    expect(throttledWatch).to.be.exist
  })

  it('should work', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const cb = cy.spy()
      watchThrottled(num, cb, { throttle: 100 })

      await nextTick()
      setNum(1)
      await nextTick()
      expect(cb).to.be.calledWith(1, undefined, undefined)

      setNum(2)
      await promiseTimeout(50)
      expect(cb).to.be.callCount(1)

      setNum(3)
      await promiseTimeout(100)
      expect(cb).to.be.callCount(2)
      expect(cb).to.be.calledWith(3, 2, Cypress.sinon.match.any)

      setNum(4)
      await promiseTimeout(110)
      expect(cb).to.be.callCount(3)
      expect(cb).to.be.calledWith(4, 3, Cypress.sinon.match.any)
    })
  })
})
