import { createMemo, type Accessor } from 'solid-js'
import { unAccessorArgsFlat } from '../utils'
import type { MaybeAccessor } from 'solidjs-use'
import type { MaybeAccessorArgs } from '../utils'

export function useMax(array: MaybeAccessor<Array<MaybeAccessor<number>>>): Accessor<number>
export function useMax(...args: Array<MaybeAccessor<number>>): Accessor<number>

/**
 * Reactively get maximum of values.
 */
export function useMax(...args: MaybeAccessorArgs<number>) {
  return createMemo<number>(() => {
    const array = unAccessorArgsFlat(args)
    return Math.max(...array)
  })
}
