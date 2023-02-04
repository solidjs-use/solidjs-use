import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.trunc`.
 */
export function useTrunc(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo<number>(() => Math.trunc(unAccessor(value)))
}
