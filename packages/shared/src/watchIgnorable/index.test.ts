import { runAsyncHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { ignorableEffect, watchIgnorable } from '.'

describe('watchIgnorable', () => {
  it('export module', () => {
    expect(watchIgnorable).to.be.exist
    expect(ignorableEffect).to.be.exist
  })

  it('ignore updates', () => {
    return runAsyncHook(async () => {
      const [count, setCount] = createSignal(0)
      const [target, setTarget] = createSignal(0)
      const { ignoreUpdates } = watchIgnorable(count, value => {
        setTarget(value)
      })

      await nextTick()
      setCount(1)
      await nextTick()
      expect(target()).to.eq(1)

      ignoreUpdates(() => {
        setCount(2)
        setCount(3)
      })

      expect(target()).to.eq(1)

      ignoreUpdates(() => {
        setCount(4)
      })
      setCount(5)

      expect(target()).to.eq(5)
    })
  })

  it('stop watch', () => {
    return runAsyncHook(async () => {
      const [count, setCount] = createSignal(0)
      const callback = cy.spy()
      const { stop } = watchIgnorable(count, callback, { defer: true })

      await nextTick()
      setCount(1)
      stop()
      await nextTick()
      setCount(2)
      expect(callback).to.have.calledOnce
    })
  })
})
