import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactive `Array.join`
 *
 * @param {Array} list - the array was called upon.
 * @param {string} separator - a string to separate each pair of adjacent elements of the array. If omitted, the array elements are separated with a comma (",").
 *
 * @returns {string} a string with all array elements joined. If arr.length is 0, the empty string is returned.
 */
export function useArrayJoin(
  list: MaybeAccessor<Array<MaybeAccessor<any>>>,
  separator?: MaybeAccessor<string | undefined>
): Accessor<string> {
  return createMemo(() =>
    unAccessor(list)
      .map(i => unAccessor(i))
      .join(unAccessor(separator))
  )
}
