import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

const defaultComparator = <T>(value: T, othVal: T) => value === othVal

export function useArrayDifference<T>(
  list: MaybeAccessor<T[]>,
  values: MaybeAccessor<T[]>,
  key?: keyof T
): Accessor<T[]>
export function useArrayDifference<T>(
  list: MaybeAccessor<T[]>,
  values: MaybeAccessor<T[]>,
  compareFn?: (value: T, othVal: T) => boolean
): Accessor<T[]>

/**
 * Reactive get array difference of two array.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayDifference
 */
export function useArrayDifference<T>(...args: any[]): Accessor<T[]> {
  const list: MaybeAccessor<T[]> = args[0]
  const values: MaybeAccessor<T[]> = args[1]
  let compareFn = args[2] ?? defaultComparator

  if (typeof compareFn === 'string') {
    const key = compareFn as keyof T
    compareFn = (value: T, othVal: T) => value[key] === othVal[key]
  }
  return createMemo(() => toValue(list).filter(x => toValue(values).findIndex(y => compareFn(x, y)) === -1))
}
