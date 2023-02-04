import { unAccessor } from 'solidjs-use'
import { createMemo, type Accessor } from 'solid-js'
import type { MaybeAccessor } from 'solidjs-use'

/**
 * Reactive `Math.floor`
 */
export function useFloor(value: MaybeAccessor<number>): Accessor<number> {
  return createMemo<number>(() => Math.floor(unAccessor(value)))
}
