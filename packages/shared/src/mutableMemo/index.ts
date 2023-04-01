import { createMemo } from 'solid-js'
import { toReactive } from '../toReactive'

/**
 * Memo reactive object.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/mutableMemo
 */
export function mutableMemo<T extends {}>(fn: () => T): T {
  return toReactive(createMemo(fn))
}
