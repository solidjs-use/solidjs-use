import { createSignal } from 'solid-js'
import { tryOnCleanup } from '../tryOnCleanup'
import { unAccessor } from '../unAccessor'
import { isClient } from '../utils'
import type { MaybeAccessor, Stoppable } from '../utils'

export interface UseTimeoutFnOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * Wrapper for `setTimeout` with controls.
 */
export function useTimeoutFn<CallbackFn extends (...args: any[]) => any>(
  cb: CallbackFn,
  interval: MaybeAccessor<number>,
  options: UseTimeoutFnOptions = {}
): Stoppable<Parameters<CallbackFn> | []> {
  const { immediate = true } = options

  const [isPending, setIsPending] = createSignal(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    setIsPending(false)
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    clear()
    setIsPending(true)
    timer = setTimeout(() => {
      setIsPending(false)
      timer = null

      cb(...args)
    }, unAccessor(interval))
  }

  if (immediate) {
    setIsPending(true)
    if (isClient) start()
  }

  tryOnCleanup(stop)

  return {
    isPending,
    start,
    stop
  }
}
