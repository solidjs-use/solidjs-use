import { runAsyncHook, runHook } from '@dream2023/cypress-solidjs'
import { mountWithUnmount } from '@solidjs-use/test-utils'
import { createSignal } from 'solid-js'
import { autoResetSignal, signalAutoReset } from '.'

describe('signalAutoReset', () => {
  it('should be defined', () => {
    expect(autoResetSignal).to.be.exist
    expect(signalAutoReset).to.be.exist
  })

  it('should be default at first', () => {
    runHook(() => {
      const [val] = signalAutoReset('default', 100)
      expect(val()).to.be.eq('default')
    })
  })

  it('should be updated', () => {
    runHook(() => {
      const [val, setVal] = signalAutoReset('default', 100)

      setVal('update')
      expect(val()).to.be.eq('update')
    })
  })

  it('should be reset', () => {
    return runAsyncHook(async () => {
      const [val, setVal] = signalAutoReset('default', 100)
      setVal('update')

      await new Promise(resolve => setTimeout(resolve, 100 + 1))
      expect(val()).to.be.eq('default')
    })
  })

  it('should change afterMs', () => {
    return runAsyncHook(async () => {
      const [afterMs, setMs] = createSignal(150)
      const [val, setVal] = signalAutoReset('default', afterMs)
      setVal('update')
      setMs(100)

      await new Promise(resolve => setTimeout(resolve, 100 + 1))
      expect(val()).to.be.eq('update')

      await new Promise(resolve => setTimeout(resolve, 50))
      expect(val()).to.be.eq('default')

      setVal('update')

      await new Promise(resolve => setTimeout(resolve, 100 + 1))
      expect(val()).to.be.eq('default')
    })
  })

  it('should not reset when unmount', () => {
    return runHook(() => {
      let valSignal = createSignal('')
      const unmount = mountWithUnmount(() => {
        valSignal = signalAutoReset('default', 100)
        valSignal[1]('update')
      })

      unmount()
      expect(valSignal[0]()).to.be.eq('update')
    })
  })
})
