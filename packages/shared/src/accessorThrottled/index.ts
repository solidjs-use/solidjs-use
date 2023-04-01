import { createEffect, createSignal, on } from 'solid-js'
import { useThrottleFn } from '../useThrottleFn'
import type { Accessor } from 'solid-js'

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/accessorThrottled
 * @param value Ref value to be watched with throttle effect
 * @param  delay  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param [trailing=true] if true, update the value again after the delay time is up
 * @param [leading=true] if true, update the value on the leading edge of the ms timeout
 */
export function accessorThrottled<T>(value: Accessor<T>, delay = 200, trailing = true, leading = true) {
  if (delay <= 0) return value

  const [throttled, setThrottled] = createSignal<T>(value())

  const updater = useThrottleFn(
    () => {
      setThrottled(() => value())
    },
    delay,
    trailing,
    leading
  )

  createEffect(
    on(
      value,
      () => {
        updater()
      },
      { defer: true }
    )
  )

  return throttled
}

// alias
export { accessorThrottled as useThrottle, accessorThrottled as throttledAccessor }
