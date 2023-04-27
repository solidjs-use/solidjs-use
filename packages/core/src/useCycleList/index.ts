import { toSignal } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createMemo, on } from 'solid-js'
import { toAccessor, toValue } from '@solidjs-use/shared'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { Accessor, Signal, Setter } from 'solid-js'

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
 * Cycle through a list of items.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useCycleList
 */
export function useCycleList<T>(list: MaybeAccessor<T[]>, options?: UseCycleListOptions<T>): UseCycleListReturn<T> {
  const [state, setState] = toSignal(getInitialValue())
  const listAccessor = toAccessor(list)

  const index = createMemo<number>(() => {
    const targetList = listAccessor()

    let index = options?.getIndexOf ? options.getIndexOf(state(), targetList) : targetList.indexOf(state())

    if (index < 0) index = options?.fallbackIndex ?? 0

    return index
  })

  function set(i: number) {
    const targetList = listAccessor()
    const length = targetList.length

    const index = ((i % length) + length) % length
    const value = targetList[index]
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

  function getInitialValue() {
    return options?.initialValue ?? toValue<T[]>(list)[0]
  }

  createEffect(
    on(listAccessor, () => {
      set(index())
    })
  )

  return {
    state,
    setState,
    setIndex: set,
    index,
    next,
    prev
  }
}

export interface UseCycleListReturn<T> {
  state: Accessor<T>
  setState: Setter<T>
  index: Accessor<number>
  setIndex: (i: number) => T
  next: (n?: number) => T
  prev: (n?: number) => T
}
