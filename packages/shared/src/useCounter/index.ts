import type { Accessor } from "solid-js"
import type { MaybeSignal } from "../utils"
import { toValue } from "../toValue"
import { toSignal } from "@solidjs-use/solid-to-vue"

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
export function useCounter(
  initialValue: MaybeSignal<number> = 0,
  options: UseCounterOptions = {}
): UserCounterReturn {
  const [count, setCount] = toSignal(initialValue)
  let _initialValue = toValue<number>(count)

  const { max = Number.POSITIVE_INFINITY, min = Number.NEGATIVE_INFINITY } = options

  const inc = (delta = 1) => setCount(Math.min(max, count() + delta))
  const dec = (delta = 1) => setCount(Math.max(min, count() - delta))
  const set = (val: number) => setCount(Math.max(min, Math.min(max, val)))
  const reset = (val = _initialValue) => {
    _initialValue = val
    return set(val)
  }

  return { count, inc, dec, set, reset }
}
