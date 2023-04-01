import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactive `Array.filter`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayFilter
 * @param {Array} list - the array was called upon.
 * @param fn - a function that is called for every element of the given `list`. Each time `fn` executes, the returned value is added to the new array.
 *
 * @returns {Array} a shallow copy of a portion of the given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. If no elements pass the test, an empty array will be returned.
 */
export function useArrayFilter<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  fn: (element: T, index: number, array: T[]) => boolean
): Accessor<T[]> {
  return createMemo(() =>
    unAccessor(list)
      .map(i => unAccessor(i))
      .filter(fn)
  )
}
