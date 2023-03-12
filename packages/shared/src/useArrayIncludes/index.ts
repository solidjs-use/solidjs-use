import { createMemo } from 'solid-js'
import { containsProp, isObject } from '../utils'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

export type UseArrayIncludesComparatorFn<T, V> = (
  element: T,
  value: V,
  index: number,
  array: Array<MaybeAccessor<T>>
) => boolean

function isArrayIncludesOptions<T, V>(obj: any): obj is UseArrayIncludesOptions<T, V> {
  return isObject(obj) && containsProp(obj, 'formIndex', 'comparator')
}

export interface UseArrayIncludesOptions<T, V> {
  fromIndex?: number
  comparator?: UseArrayIncludesComparatorFn<T, V> | keyof T
}

export function useArrayIncludes<T, V = any>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  value: MaybeAccessor<V>,
  comparator?: UseArrayIncludesComparatorFn<T, V>
): Accessor<boolean>
export function useArrayIncludes<T, V = any>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  value: MaybeAccessor<V>,
  comparator?: keyof T
): Accessor<boolean>
export function useArrayIncludes<T, V = any>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  value: MaybeAccessor<V>,
  options?: UseArrayIncludesOptions<T, V>
): Accessor<boolean>
/**
 * Reactive `Array.includes`
 *
 * @returns {boolean} true if the `value` is found in the array. Otherwise, false.
 */
export function useArrayIncludes<T, V = any>(...args: any[]): Accessor<boolean> {
  const list: MaybeAccessor<Array<MaybeAccessor<T>>> = args[0]
  const value: MaybeAccessor<V> = args[1]

  let comparator: UseArrayIncludesComparatorFn<T, V> = args[2]
  let formIndex = 0

  if (isArrayIncludesOptions(comparator)) {
    formIndex = comparator.fromIndex ?? 0
    comparator = comparator.comparator!
  }

  if (typeof comparator === 'string') {
    const key = comparator as keyof T
    comparator = (element: T, value: V) => element[key] === unAccessor(value)
  }

  comparator = comparator ?? ((element: T, value: T) => element === unAccessor(value))

  return createMemo(() =>
    unAccessor(list)
      .slice(formIndex)
      .some((element, index, array) => comparator(unAccessor(element), unAccessor(value), index, unAccessor(array)))
  )
}
