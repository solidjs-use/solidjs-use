import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.floor`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useFloor
 */
export function useFloor(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo<number>(() => Math.floor(toValue(value)))
}
