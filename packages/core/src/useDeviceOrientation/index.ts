/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive DeviceOrientationEvent.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDeviceOrientation
 */
export function useDeviceOrientation(options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options
  const isSupported = useSupported(() => window && 'DeviceOrientationEvent' in window)

  const [isAbsolute, setIsAbsolute] = createSignal(false)
  const [alpha, setAlpha] = createSignal<number | null>(null)
  const [beta, setBeta] = createSignal<number | null>(null)
  const [gamma, setGamma] = createSignal<number | null>(null)

  if (window && isSupported()) {
    useEventListener(window, 'deviceorientation', event => {
      setIsAbsolute(event.absolute)
      setAlpha(event.alpha)
      setBeta(event.beta)
      setGamma(event.gamma)
    })
  }

  return {
    isSupported,
    isAbsolute,
    alpha,
    beta,
    gamma
  }
}

export type UseDeviceOrientationReturn = ReturnType<typeof useDeviceOrientation>
