import { createMemo, type Accessor } from 'solid-js'
import { unAccessorArgsFlat } from '../utils'
import type { MaybeAccessor } from 'solidjs-use'
import type { MaybeAccessorArgs } from '../utils'

export function useMin(array: MaybeAccessor<Array<MaybeAccessor<number>>>): Accessor<number>
export function useMin(...args: Array<MaybeAccessor<number>>): Accessor<number>

/**
 * Reactive `Math.min`.
 */
export function useMin(...args: MaybeAccessorArgs<number>) {
  return createMemo<number>(() => {
    const array = unAccessorArgsFlat(args)
    return Math.min(...array)
  })
}
