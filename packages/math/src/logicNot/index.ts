import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * `NOT` conditions for Signals.
 */
export function logicNot(v: MaybeAccessor<any>): Accessor<boolean> {
  return createMemo(() => !unAccessor(v))
}

// alias
export { logicNot as not }
