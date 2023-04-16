import { createMemo } from 'solid-js'
import { toValue } from '../toValue'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactively convert a Accessor to string.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/useToString
 */
export function useToString(value: MaybeAccessor<unknown>): Accessor<string> {
  return createMemo(() => `${toValue(value)}`)
}
