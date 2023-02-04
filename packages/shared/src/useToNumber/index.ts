import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

export interface UseToNumberOptions {
  /**
   * Method to use to convert the value to a number.
   *
   * @default 'parseFloat'
   */
  method?: 'parseFloat' | 'parseInt'

  /**
   * The base in mathematical numeral systems passed to `parseInt`.
   * Only works with `method: 'parseInt'`
   */
  radix?: number

  /**
   * Replace NaN with zero
   *
   * @default false
   */
  nanToZero?: boolean
}

/**
 * Computed reactive object.
 */
export function useToNumber(value: MaybeAccessor<number | string>, options: UseToNumberOptions = {}): Accessor<number> {
  const { method = 'parseFloat', radix, nanToZero } = options

  return createMemo(() => {
    let resolved = unAccessor(value)
    if (typeof resolved === 'string') resolved = Number[method](resolved, radix)
    if (nanToZero && isNaN(resolved)) resolved = 0
    return resolved
  })
}
