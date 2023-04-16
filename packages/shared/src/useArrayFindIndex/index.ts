import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactive `Array.findIndex`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayFindIndex
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns {number} the index of the first element in the array that passes the test. Otherwise, "-1".
 */
export function useArrayFindIndex<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  fn: (element: T, index: number, array: Array<MaybeAccessor<T>>) => unknown
): Accessor<number> {
  return createMemo(() => toValue(list).findIndex((element, index, array) => fn(toValue(element), index, array)))
}
