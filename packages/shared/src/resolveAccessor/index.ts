import { isAccessor } from '@solidjs-use/solid-to-vue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Normalize value/accessor/getter to `Accessor`.
 */
export function resolveAccessor<T>(r: MaybeAccessor<T>): Accessor<T> {
  return isAccessor<T>(r) ? r : () => r
}
