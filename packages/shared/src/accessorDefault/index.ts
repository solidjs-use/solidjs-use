import { createMemo } from 'solid-js'
import type { Accessor } from 'solid-js'

/**
 * Apply default value to a Accessor.
 */
export function accessorDefault<T>(source: Accessor<T | undefined | null>, defaultValue: T): Accessor<T> {
  return createMemo(() => source() ?? defaultValue)
}
