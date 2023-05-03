import { toValue } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Accuracy of handling numerical values.
 *
 * @param value - The value
 * @param power - The power
 * @returns The result of multiplying the value with the power
 */
function accurateMultiply(value: number, power: number): number {
  const valueStr = value.toString()

  if (value > 0 && valueStr.includes('.')) {
    const decimalPlaces = valueStr.split('.')[1].length
    const multiplier = 10 ** decimalPlaces ?? 1

    return (value * multiplier * power) / multiplier
  }

  return value * power
}

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
    return Math[toValue(options)?.math ?? 'round'](accurateMultiply(_value, power)) / power
  })
}
