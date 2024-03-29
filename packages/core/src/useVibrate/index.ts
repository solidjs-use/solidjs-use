import { toAccessor, useIntervalFn } from '@solidjs-use/shared'
import { useSupported } from '../useSupported'
import { defaultNavigator } from '../_configurable'
import type { ConfigurableNavigator } from '../_configurable'
import type { MaybeAccessor, Pausable } from '@solidjs-use/shared'

export interface UseVibrateOptions extends ConfigurableNavigator {
  /**
   *
   * Vibration Pattern
   *
   * An array of values describes alternating periods in which the
   * device is vibrating and not vibrating. Each value in the array
   * is converted to an integer, then interpreted alternately as
   * the number of milliseconds the device should vibrate and the
   * number of milliseconds it should not be vibrating
   *
   * @default []
   *
   */
  pattern?: MaybeAccessor<number[] | number>
  /**
   * Interval to run a persistent vibration, in ms
   *
   * Pass `0` to disable
   *
   * @default 0
   *
   */
  interval?: number
}

/**
 * Reactive vibrate.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useVibrate
 */
export function useVibrate(options?: UseVibrateOptions) {
  const { pattern = [], interval = 0, navigator = defaultNavigator } = options ?? {}

  const isSupported = useSupported(() => typeof navigator !== 'undefined' && 'vibrate' in navigator)

  const patternAccessor = toAccessor(pattern)
  let intervalControls: Pausable | undefined

  const vibrate = (pattern = patternAccessor()) => {
    if (isSupported()) navigator!.vibrate(pattern)
  }

  // Attempt to stop the vibration:
  const stop = () => {
    // Stope the vibration if we need to:
    if (isSupported()) navigator!.vibrate(0)
    intervalControls?.pause()
  }

  if (interval > 0) {
    intervalControls = useIntervalFn(vibrate, interval, {
      immediate: false,
      immediateCallback: false
    })
  }

  return {
    isSupported,
    pattern,
    intervalControls,
    vibrate,
    stop
  }
}

export type UseVibrateReturn = ReturnType<typeof useVibrate>
