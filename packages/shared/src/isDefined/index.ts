import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'

/**
 * Non-nullish checking type guard for Signal.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/isDefined
 */
export function isDefined<T>(v: Accessor<T>): v is Accessor<Exclude<T, null | undefined>>
export function isDefined<T>(v: T): v is Exclude<T, null | undefined>
export function isDefined<T>(v: Accessor<T>): boolean {
  return toValue(v) != null
}
