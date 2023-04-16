import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

function uniq<T>(array: T[]) {
  return Array.from(new Set(array))
}

function uniqueElementsBy<T>(array: T[], fn: (a: T, b: T, array: T[]) => boolean) {
  return array.reduce<T[]>((acc, v) => {
    if (!acc.some(x => fn(v, x, array))) acc.push(v)
    return acc
  }, [])
}

/**
 * reactive unique array.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayUnique
 */
export function useArrayUnique<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  compareFn?: (a: T, b: T, array: T[]) => boolean
): Accessor<T[]> {
  return createMemo<T[]>(() => {
    const resolvedList = toValue(list).map(element => toValue(element))
    return compareFn ? uniqueElementsBy(resolvedList, compareFn) : uniq(resolvedList)
  })
}
