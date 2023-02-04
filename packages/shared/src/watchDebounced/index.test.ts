import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { promiseTimeout } from '../utils'
import { debouncedWatch, watchDebounced } from '.'

describe('watchDebounced', () => {
  it('should export module', () => {
    expect(watchDebounced).to.be.exist
    expect(debouncedWatch).to.be.exist
  })

  it('should work by default', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const cb = cy.spy()
      watchDebounced(num, cb)

      await nextTick()
      setNum(1)
      await nextTick()
      expect(cb).to.be.calledWith(1, undefined, undefined)

      setNum(2)
      await nextTick()
      expect(cb).to.be.calledWith(2, 1, Cypress.sinon.match.any)
    })
  })

  it('should work when set debounce and maxWait', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const cb = cy.spy()
      watchDebounced(num, cb, { debounce: 100, maxWait: 150 })

      await nextTick()
      setNum(1)
      await nextTick()
      expect(cb).to.be.callCount(0)

      setNum(2)
      await promiseTimeout(50)
      expect(cb).to.be.callCount(0)

      await promiseTimeout(50)
      expect(cb).to.be.calledWith(2, 1, Cypress.sinon.match.any)

      setNum(4)
      await promiseTimeout(80)
      expect(cb).to.be.callCount(1)

      setNum(5)
      await promiseTimeout(75)
      expect(cb).to.be.callCount(2)
      expect(cb).to.be.calledWith(4, 2, Cypress.sinon.match.any)
    })
  })
})
