import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.ceil`.
 */
export function useCeil(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo<number>(() => Math.ceil(unAccessor(value)))
}
