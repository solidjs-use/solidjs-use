import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

export type UseArrayReducer<PV, CV, R> = (previousValue: PV, currentValue: CV, currentIndex: number) => R

/**
 * Reactive `Array.reduce`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayReduce
 * @param {Array} list - the array was called upon.
 * @param reducer - a "reducer" function.
 *
 * @returns the value that results from running the "reducer" callback function to completion over the entire array.
 */
export function useArrayReduce<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  reducer: UseArrayReducer<T, T, T>
): Accessor<T>

/**
 * Reactive `Array.reduce`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayReduce
 * @param {Array} list - the array was called upon.
 * @param reducer - a "reducer" function.
 * @param initialValue - a value to be initialized the first time when the callback is called.
 *
 * @returns the value that results from running the "reducer" callback function to completion over the entire array.
 */
export function useArrayReduce<T, U>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  reducer: UseArrayReducer<U, T, U>,
  initialValue: MaybeAccessor<U>
): Accessor<U>

/**
 * Reactive `Array.reduce`
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useArrayReduce
 * @param {Array} list - the array was called upon.
 * @param reducer - a "reducer" function.
 * @param args
 *
 * @returns the value that results from running the "reducer" callback function to completion over the entire array.
 */
export function useArrayReduce<T>(
  list: MaybeAccessor<Array<MaybeAccessor<T>>>,
  reducer: (...p: any[]) => any,
  ...args: any[]
): Accessor<T> {
  const reduceCallback = (sum: any, value: any, index: number) => reducer(toValue(sum), toValue(value), index)

  return createMemo(() => {
    const resolved = toValue(list)
    // Depending on the behavior of reduce, undefined is also a valid initialization value,
    // and this code will distinguish the behavior between them.
    return args.length ? resolved.reduce(reduceCallback, toValue(args[0])) : resolved.reduce(reduceCallback)
  })
}
