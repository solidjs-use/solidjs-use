import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.abs`.
 */
export function useAbs(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo(() => Math.abs(unAccessor(value)))
}
