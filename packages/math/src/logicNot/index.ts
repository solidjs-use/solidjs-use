import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * `NOT` conditions for Signals.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/logicNot
 */
export function logicNot(v: MaybeAccessor<any>): Accessor<boolean> {
  return createMemo(() => !toValue(v))
}

// alias
export { logicNot as not }
