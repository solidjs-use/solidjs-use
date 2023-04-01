import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive screen orientation.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useScreenOrientation
 */
export const useScreenOrientation = (options: ConfigurableWindow = {}) => {
  const { window = defaultWindow } = options

  const isSupported = useSupported(() => window && 'screen' in window && 'orientation' in window.screen)

  const screenOrientation = isSupported() ? window!.screen.orientation : ({} as ScreenOrientation)

  const [orientation, setOrientation] = createSignal<OrientationType | undefined>(screenOrientation.type)
  const [angle, setAngle] = createSignal(screenOrientation.angle || 0)

  if (isSupported()) {
    useEventListener(window, 'orientationchange', () => {
      setOrientation(screenOrientation.type)
      setAngle(screenOrientation.angle)
    })
  }

  const lockOrientation = (type: OrientationLockType) => {
    if (!isSupported()) return Promise.reject(new Error('Not supported'))

    return screenOrientation.lock(type)
  }

  const unlockOrientation = () => {
    if (isSupported()) screenOrientation.unlock()
  }

  return {
    isSupported,
    orientation,
    angle,
    lockOrientation,
    unlockOrientation
  }
}

export type UseScreenOrientationReturn = ReturnType<typeof useScreenOrientation>
