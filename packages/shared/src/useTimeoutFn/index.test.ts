import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { createSignal } from 'solid-js'
import { promiseTimeout } from '../utils'
import { useTimeoutFn } from '.'

describe('useTimeoutFn', () => {
  it('supports reactive intervals', () => {
    return runAsyncHook(async () => {
      const callback = cy.stub()
      const [interval, setInterval] = createSignal(0)
      const { start } = useTimeoutFn(callback, interval)

      start()
      await promiseTimeout(1)
      expect(callback).to.be.called

      callback.reset()
      setInterval(50)

      start()
      await promiseTimeout(1)
      expect(callback).not.to.be.called
      await promiseTimeout(100)
      expect(callback).to.be.called
    })
  })

  it('supports getting pending status', async () => {
    const callback = cy.spy()
    const { start, isPending } = useTimeoutFn(callback, 0, { immediate: false })

    expect(isPending()).to.eq(false)
    expect(callback).not.to.be.called

    start()

    expect(isPending()).to.eq(true)
    expect(callback).not.to.be.called

    await promiseTimeout(1)

    expect(isPending()).to.eq(false)
    expect(callback).be.called
  })
})
