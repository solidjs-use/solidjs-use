import { createMemo, type Accessor } from 'solid-js'
import { toValueArgsFlat } from '../utils'
import type { MaybeAccessor } from 'solidjs-use'
import type { MaybeAccessorArgs } from '../utils'

export function useMin(array: MaybeAccessor<Array<MaybeAccessor<number>>>): Accessor<number>
export function useMin(...args: Array<MaybeAccessor<number>>): Accessor<number>

/**
 * Reactive `Math.min`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useMin
 */
export function useMin(...args: MaybeAccessorArgs<number>) {
  return createMemo<number>(() => {
    const array = toValueArgsFlat(args)
    return Math.min(...array)
  })
}
