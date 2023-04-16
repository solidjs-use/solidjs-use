import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactive `Array.map`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayMap
 * @param {Array} list - the array was called upon.
 * @param fn - a function that is called for every element of the given `list`. Each time `fn` executes, the returned value is added to the new array.
 *
 * @returns {Array} a new array with each element being the result of the callback function.
 */
export function useArrayMap<T, U = T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  fn: (element: T, index: number, array: T[]) => U
): Accessor<U[]> {
  return createMemo(() =>
    toValue(list)
      .map(i => toValue(i))
      .map(fn)
  )
}
