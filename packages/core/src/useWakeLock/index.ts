import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultDocument, defaultNavigator } from '../_configurable'
import type { ConfigurableDocument, ConfigurableNavigator } from '../_configurable'

type WakeLockType = 'screen'

export interface WakeLockSentinel extends EventTarget {
  type: WakeLockType
  released: boolean
  release: () => Promise<void>
}

type NavigatorWithWakeLock = Navigator & {
  wakeLock: { request: (type: WakeLockType) => Promise<WakeLockSentinel> }
}

export type UseWakeLockOptions = ConfigurableNavigator & ConfigurableDocument

/**
 * Reactive Screen Wake Lock API.
 */
export const useWakeLock = (options: UseWakeLockOptions = {}) => {
  const { navigator = defaultNavigator, document = defaultDocument } = options
  let wakeLock: WakeLockSentinel | null
  const isSupported = useSupported(() => navigator && 'wakeLock' in navigator)
  const [isActive, setIsActive] = createSignal(false)

  async function onVisibilityChange() {
    if (!isSupported() || !wakeLock) return

    if (document && document.visibilityState === 'visible')
      wakeLock = await (navigator as NavigatorWithWakeLock).wakeLock.request('screen')

    setIsActive(!wakeLock.released)
  }

  if (document) useEventListener(document, 'visibilitychange', onVisibilityChange, { passive: true })

  async function request(type: WakeLockType) {
    if (!isSupported()) return
    wakeLock = await (navigator as NavigatorWithWakeLock).wakeLock.request(type)
    setIsActive(!wakeLock.released)
  }

  async function release() {
    if (!isSupported() || !wakeLock) return
    await wakeLock.release()
    setIsActive(!wakeLock.released)
    wakeLock = null
  }

  return {
    isSupported,
    isActive,
    request,
    release
  }
}

export type UseWakeLockReturn = ReturnType<typeof useWakeLock>
