import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

export interface UsePrecisionOptions {
  /**
   * Method to use for rounding
   *
   * @default 'round'
   */
  math?: 'floor' | 'ceil' | 'round'
}

/**
 * Reactively set the precision of a number.
 *
 * @see https://solidjs-use.github.io/solidjs-use/math/usePrecision
 */
export function usePrecision(
  value: MaybeAccessor<number>,
  digits: MaybeAccessor<number>,
  options?: MaybeAccessor<UsePrecisionOptions>
): Accessor<number> {
  return createMemo<number>(() => {
    const _value = toValue(value)
    const _digits = toValue(digits)
    const power = 10 ** _digits
    return Math[toValue(options)?.math ?? 'round'](_value * power) / power
  })
}
