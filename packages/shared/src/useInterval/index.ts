import { createSignal } from 'solid-js'
import { useIntervalFn } from '../useIntervalFn'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor, Pausable } from '../utils'

export interface UseIntervalOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls

  /**
   * Execute the update immediately on calling
   *
   * @default true
   */
  immediate?: boolean
  /**
   * Callback on every interval
   */
  callback?: (count: number) => void
}

export interface UseIntervalControls {
  counter: Accessor<number>
  reset: () => void
}

/**
 * Reactive counter increases on every interval
 */
export function useInterval(interval?: MaybeAccessor<number>, options?: UseIntervalOptions<false>): Accessor<number>
export function useInterval(
  interval: MaybeAccessor<number>,
  options: UseIntervalOptions<true>
): UseIntervalControls & Pausable
export function useInterval(interval: MaybeAccessor<number> = 1000, options: UseIntervalOptions<boolean> = {}) {
  const { controls: exposeControls = false, immediate = true, callback } = options

  const [counter, setCounter] = createSignal(0)
  const update = () => setCounter(count => count + 1)
  const reset = () => {
    setCounter(0)
  }
  const controls = useIntervalFn(
    callback
      ? () => {
          update()
          callback(counter())
        }
      : update,
    interval,
    { immediate }
  )

  if (exposeControls) {
    return {
      counter,
      reset,
      ...controls
    }
  }
  return counter
}
