import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * `OR` conditions for Signals.
 */
export function logicOr(...args: Array<MaybeAccessor<any>>): Accessor<boolean> {
  return createMemo(() => args.some(i => unAccessor(i)))
}

// alias
export { logicOr as or }
