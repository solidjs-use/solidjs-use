import { createMemo, type Accessor } from 'solid-js'
import { toValueArgsFlat } from '../utils'
import type { MaybeAccessor } from 'solidjs-use'
import type { MaybeAccessorArgs } from '../utils'

export function useMax(array: MaybeAccessor<Array<MaybeAccessor<number>>>): Accessor<number>
export function useMax(...args: Array<MaybeAccessor<number>>): Accessor<number>

/**
 * Reactively get maximum of values.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useMax
 */
export function useMax(...args: MaybeAccessorArgs<number>) {
  return createMemo<number>(() => {
    const array = toValueArgsFlat(args)
    return Math.max(...array)
  })
}
