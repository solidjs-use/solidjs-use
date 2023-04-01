import { isAccessor } from '@solidjs-use/solid-to-vue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Normalize value/accessor/getter to `Accessor`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/resolveAccessor
 */
export function resolveAccessor<T>(r: MaybeAccessor<T>): Accessor<T> {
  return isAccessor<T>(r) ? r : () => r
}
