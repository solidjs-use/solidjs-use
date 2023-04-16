import { createMemo, type Accessor } from 'solid-js'
import { toValueArgsFlat } from '../utils'
import type { MaybeAccessor } from 'solidjs-use'
import type { MaybeAccessorArgs } from '../utils'

export function useSum(array: MaybeAccessor<Array<MaybeAccessor<number>>>): Accessor<number>
export function useSum(...args: Array<MaybeAccessor<number>>): Accessor<number>

/**
 * Get the sum of a set of numbers.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useSum
 */
export function useSum(...args: MaybeAccessorArgs<number>): Accessor<number> {
  return createMemo(() => toValueArgsFlat(args).reduce((sum, v) => (sum += v), 0))
}
