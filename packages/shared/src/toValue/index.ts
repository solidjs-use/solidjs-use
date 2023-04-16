import type { AnyFn, MaybeAccessor } from '../utils'

/**
 * Get the value of value/Accessor.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/toValue
 */
export function toValue<T>(r: MaybeAccessor<T>): T {
  return typeof r === 'function' ? (r as AnyFn)() : r
}

/**
 * @deprecated use `toValue` instead
 */
export const unAccessor = toValue
