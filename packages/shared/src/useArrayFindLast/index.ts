import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

// Polyfill for node version < 18
function findLast<T>(arr: T[], cb: (element: T, index: number, array: T[]) => boolean): T | undefined {
  let index = arr.length
  while (index-- > 0) {
    if (cb(arr[index], index, arr)) return arr[index]
  }
  return undefined
}

/**
 * Reactive `Array.findLast`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayFindLast
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns the last element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
 */
export function useArrayFindLast<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  fn: (element: T, index: number, array: Array<MaybeAccessor<T>>) => boolean
): Accessor<T | undefined> {
  return createMemo(() =>
    toValue<T | undefined>(
      // @ts-expect-error - missing in types
      // https://github.com/microsoft/TypeScript/issues/48829
      !Array.prototype.findLast
        ? findLast(toValue(list), (element, index, array) => fn(toValue(element), index, array))
        : toValue(list)
            // @ts-expect-error - missing in types
            .findLast((element, index, array) => fn(toValue(element), index, array))
    )
  )
}
