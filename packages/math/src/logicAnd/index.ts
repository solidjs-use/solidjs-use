import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * `AND` conditions for Signals.
 */
export function logicAnd(...args: Array<MaybeAccessor<any>>): Accessor<boolean> {
  return createMemo(() => args.every(i => unAccessor(i)))
}

// alias
export { logicAnd as and }
