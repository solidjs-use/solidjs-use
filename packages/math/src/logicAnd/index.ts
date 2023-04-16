import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * `AND` conditions for Signals.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/logicAnd
 */
export function logicAnd(...args: Array<MaybeAccessor<any>>): Accessor<boolean> {
  return createMemo(() => args.every(i => toValue(i)))
}

// alias
export { logicAnd as and }
