import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * `OR` conditions for Signals.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/logicOr
 */
export function logicOr(...args: Array<MaybeAccessor<any>>): Accessor<boolean> {
  return createMemo(() => args.some(i => toValue(i)))
}

// alias
export { logicOr as or }
