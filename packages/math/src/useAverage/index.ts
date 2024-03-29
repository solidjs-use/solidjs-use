import { createMemo, type Accessor } from 'solid-js'
import { toValueArgsFlat } from '../utils'
import type { MaybeAccessor } from 'solidjs-use'
import type { MaybeAccessorArgs } from '../utils'

export function useAverage(array: MaybeAccessor<Array<MaybeAccessor<number>>>): Accessor<number>
export function useAverage(...args: Array<MaybeAccessor<number>>): Accessor<number>

/**
 * Get the average of an array reactively.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useAverage
 */
export function useAverage(...args: MaybeAccessorArgs<number>): Accessor<number> {
  return createMemo(() => {
    const array = toValueArgsFlat(args)
    return array.reduce((sum, v) => (sum += v), 0) / array.length
  })
}
