import { createSignal } from 'solid-js'
import { tryOnCleanup } from '../tryOnCleanup'
import { unAccessor } from '../unAccessor'
import { isClient, type MaybeAccessor, type Stoppable } from '../utils'

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
export function useTimeoutFn(
  cb: (...args: unknown[]) => any,
  interval: MaybeAccessor<number>,
  options: UseTimeoutFnOptions = {}
): Stoppable {
  const { immediate = true } = options

  const [isPending, setIsPending] = createSignal(false)

  let timer: number | null = null

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

  function start(...args: unknown[]) {
    clear()
    setIsPending(true)
    timer = setTimeout(() => {
      setIsPending(false)
      timer = null

      cb(...args)
    }, unAccessor(interval)) as unknown as number
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
