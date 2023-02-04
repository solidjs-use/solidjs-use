import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { pausableWatch, watchPausable } from '.'

describe('watchPausable', () => {
  it('should export module', () => {
    expect(watchPausable).to.be.exist
    expect(pausableWatch).to.be.exist
  })

  it('should work', () => {
    return runAsyncHook(async () => {
      const [num, setNum] = createSignal(0)
      const cb = cy.spy()
      const { stop, pause, resume, isActive } = watchPausable(num, cb)

      await nextTick()
      setNum(1)
      await nextTick()
      expect(isActive()).to.be.true
      expect(cb).to.be.calledWith(1, undefined, undefined)

      setNum(2)
      await nextTick()
      expect(isActive()).to.be.true
      expect(cb).to.be.callCount(2)
      expect(cb).to.be.calledWith(2, 1, Cypress.sinon.match.any)

      pause()
      setNum(3)
      await nextTick()
      expect(isActive()).to.be.false
      expect(cb).to.be.callCount(2)

      resume()
      setNum(4)
      await nextTick()
      expect(isActive()).to.be.true
      expect(cb).to.be.callCount(3)
      expect(cb).to.be.calledWith(4, 3, Cypress.sinon.match.any)

      stop()
      setNum(5)
      await nextTick()
      expect(isActive()).to.be.true
      expect(cb).to.be.callCount(3)
    })
  })
})
