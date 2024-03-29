import { toValue } from '../toValue'
import type { MaybeAccessor } from '../utils'

/**
 * Shorthand for accessing `Accessor()`.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/get
 */
export function get<T>(accessor: MaybeAccessor<T>): T
export function get<T, K extends keyof T>(accessor: MaybeAccessor<T>, key: K): T[K]

export function get(obj: MaybeAccessor<any>, key?: string | number | symbol) {
  if (key == null) return toValue(obj)

  return toValue(obj)[key]
}
