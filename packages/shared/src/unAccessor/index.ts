import type { AnyFn, MaybeAccessor } from '../utils'

/**
 * Get the value of value/Accessor.
 */
export function unAccessor<T>(r: MaybeAccessor<T>): T {
  return typeof r === 'function' ? (r as AnyFn)() : r
}
