import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactive `Array.find`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayFind
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
    toValue<T | undefined>(toValue(list).find((element, index, array) => fn(toValue(element), index, array)))
  )
}
