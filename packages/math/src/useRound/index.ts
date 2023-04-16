import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.round`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useRound
 */
export function useRound(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo<number>(() => Math.round(toValue(value)))
}
