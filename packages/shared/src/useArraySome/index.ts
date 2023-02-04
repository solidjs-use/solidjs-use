import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactive `Array.some`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns {boolean} **true** if the `fn` function returns a **truthy** value for any element from the array. Otherwise, **false**.
 */
export function useArraySome<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  fn: (element: T, index: number, array: Array<MaybeAccessor<T>>) => unknown
): Accessor<boolean> {
  return createMemo(() => unAccessor(list).some((element, index, array) => fn(unAccessor(element), index, array)))
}
