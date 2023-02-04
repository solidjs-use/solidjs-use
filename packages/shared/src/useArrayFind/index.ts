import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactive `Array.find`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
 */
export function useArrayFind<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  fn: (element: T, index: number, array: Array<MaybeAccessor<T>>) => boolean
): Accessor<T | undefined> {
  return createMemo(() =>
    unAccessor<T | undefined>(unAccessor(list).find((element, index, array) => fn(unAccessor(element), index, array)))
  )
}
