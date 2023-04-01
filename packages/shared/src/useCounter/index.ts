import { createSignal } from 'solid-js'
import type { Accessor } from 'solid-js'

export interface UseCounterOptions {
  min?: number
  max?: number
}

export interface UserCounterReturn {
  count: Accessor<number>
  inc: (delta?: number) => number
  dec: (delta?: number) => number
  set: (val: number) => number
  reset: (val?: number) => number
}

/**
 * Basic counter with utility functions.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useCounter
 */
export function useCounter(initialValue = 0, options: UseCounterOptions = {}): UserCounterReturn {
  const [count, setCount] = createSignal(initialValue)

  const { max = Infinity, min = -Infinity } = options

  const inc = (delta = 1) => setCount(Math.min(max, count() + delta))
  const dec = (delta = 1) => setCount(Math.max(min, count() - delta))
  const set = (val: number) => setCount(Math.max(min, Math.min(max, val)))
  const reset = (val = initialValue) => {
    initialValue = val
    return set(val)
  }

  return { count, inc, dec, set, reset }
}
