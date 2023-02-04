import { createMemo } from 'solid-js'
import { toReactive } from '../toReactive'

/**
 * Memo reactive object.
 */
export function mutableMemo<T extends {}>(fn: () => T): T {
  return toReactive(createMemo(fn))
}
