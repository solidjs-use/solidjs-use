import { unAccessor } from '../unAccessor'
import type { MaybeAccessor } from '../utils'

/**
 * Shorthand for accessing `Accessor()`
 */
export function get<T>(accessor: MaybeAccessor<T>): T
export function get<T, K extends keyof T>(accessor: MaybeAccessor<T>, key: K): T[K]

export function get(obj: MaybeAccessor<any>, key?: string | number | symbol) {
  if (key == null) return unAccessor(obj)

  return unAccessor(obj)[key]
}
