import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.round`.
 */
export function useRound(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo<number>(() => Math.round(unAccessor(value)))
}
