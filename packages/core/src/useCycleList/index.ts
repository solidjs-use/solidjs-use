import { toSignal } from '@solidjs-use/shared/solid-to-vue'
import { createMemo } from 'solid-js'
import type { Accessor, Signal, Setter } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UseCycleListOptions<T> {
  /**
   * The initial value of the state.
   * A Accessor can be provided to reuse.
   */
  initialValue?: MaybeAccessor<T> | Signal<T>

  /**
   * The default index when
   */
  fallbackIndex?: number

  /**
   * Custom function to get the index of the current value.
   */
  getIndexOf?: (value: T, list: T[]) => number
}

/**
 * Cycle through a list of items
 */
export function useCycleList<T>(list: T[], options?: UseCycleListOptions<T>): UseCycleListReturn<T> {
  const [state, setState] = toSignal(options?.initialValue ?? list[0]) as Signal<T>

  const index = createMemo<number>(() => {
    let index = options?.getIndexOf ? options.getIndexOf(state(), list) : list.indexOf(state())

    if (index < 0) index = options?.fallbackIndex ?? 0

    return index
  })

  function set(i: number) {
    const length = list.length
    const index = ((i % length) + length) % length
    const value = list[index]
    setState(() => value)
    return value
  }

  function shift(delta = 1) {
    return set(index() + delta)
  }

  function next(n = 1) {
    return shift(n)
  }

  function prev(n = 1) {
    return shift(-n)
  }

  return {
    state,
    setState,
    index,
    next,
    prev
  }
}

export interface UseCycleListReturn<T> {
  state: Accessor<T>
  setState: Setter<T>
  index: Accessor<number>
  next: (n?: number) => T
  prev: (n?: number) => T
}
