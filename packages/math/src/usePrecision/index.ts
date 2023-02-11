import { unAccessor } from 'solidjs-use'
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
 */
export function usePrecision(
  value: MaybeAccessor<number>,
  digits: MaybeAccessor<number>,
  options?: MaybeAccessor<UsePrecisionOptions>
): Accessor<number | string> {
  return createMemo<number | string>(() => {
    const _value = unAccessor(value)
    const _digits = unAccessor(digits)
    const power = 10 ** _digits
    return Math[unAccessor(options)?.math ?? 'round'](_value * power) / power
  })
}
