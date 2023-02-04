import { runAsyncHook } from '@dream2023/cypress-solidjs'
import { promiseTimeout } from '@solidjs-use/shared'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { useWakeLock } from '.'
import type { WakeLockSentinel } from '.'

describe('useWakeLock', () => {
  it('isActive not changed if not supported', () => {
    return runAsyncHook(async () => {
      const { isActive, request, release } = useWakeLock({ navigator: {} as Navigator })

      expect(isActive()).to.be.false

      await request('screen')

      expect(isActive()).to.be.false

      await release()

      expect(isActive()).to.be.false
    })
  })

  it('isActive changed if supported', () => {
    return runAsyncHook(async () => {
      const createWakeLock = () => {
        let _released = false
        return {
          get released() {
            return _released
          },
          release: () => {
            _released = true
            return Promise.resolve()
          }
        } as WakeLockSentinel
      }

      Object.defineProperty(navigator, 'wakeLock', {
        value: { request: () => createWakeLock() },
        writable: true
      })
      const { isActive, request, release } = useWakeLock()

      expect(isActive()).to.be.false

      await request('screen')

      expect(isActive()).to.be.true

      await release()

      expect(isActive()).to.be.false
    })
  })

  it('isActive changed if show other tabs or minimize window', () => {
    return runAsyncHook(async () => {
      const createWakeLock = () => {
        let _released = false
        return {
          get released() {
            return _released
          },
          release: () => {
            _released = true
            return Promise.resolve()
          }
        } as WakeLockSentinel
      }

      Object.defineProperty(navigator, 'wakeLock', {
        value: { request: () => createWakeLock() },
        writable: true
      })
      const { isActive, request } = useWakeLock()

      expect(isActive()).to.be.false

      await request('screen')
      await promiseTimeout(10)

      expect(isActive()).to.be.true

      document.dispatchEvent(new window.Event('visibilitychange'))

      await nextTick()

      expect(isActive()).to.be.true
    })
  })
})
