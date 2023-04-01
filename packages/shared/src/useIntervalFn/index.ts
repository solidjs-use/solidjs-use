import { isAccessor } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { tryOnCleanup } from '../tryOnCleanup'
import { unAccessor } from '../unAccessor'
import { isClient } from '../utils'
import { watch } from '../watch'
import type { Fn, MaybeAccessor, Pausable } from '../utils'

export interface UseIntervalFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Execute the callback immediate after calling this function
   *
   * @default false
   */
  immediateCallback?: boolean
}

/**
 * Wrapper for `setInterval` with controls.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useIntervalFn
 */
export function useIntervalFn(
  cb: Fn,
  interval: MaybeAccessor<number> = 1000,
  options: UseIntervalFnOptions = {}
): Pausable {
  const { immediate = true, immediateCallback = false } = options

  let timer: ReturnType<typeof setInterval> | null = null
  const [isActive, setIsActive] = createSignal(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    setIsActive(false)
    clean()
  }

  function resume() {
    const intervalValue = unAccessor(interval)
    if (intervalValue <= 0) return
    setIsActive(true)
    if (immediateCallback) cb()
    clean()
    timer = setInterval(cb, intervalValue)
  }

  if (immediate && isClient) resume()

  if (isAccessor(interval)) {
    const stopWatch = watch(
      interval,
      () => {
        if (isActive() && isClient) resume()
      },
      { defer: true }
    )
    tryOnCleanup(stopWatch)
  }

  tryOnCleanup(pause)

  return {
    isActive,
    pause,
    resume
  }
}
