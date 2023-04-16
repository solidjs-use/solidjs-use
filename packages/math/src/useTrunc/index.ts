import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.trunc`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/useTrunc
 */
export function useTrunc(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo<number>(() => Math.trunc(toValue(value)))
}
