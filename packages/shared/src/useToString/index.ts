import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * Reactively convert a Accessor to string.
 */
export function useToString(value: MaybeAccessor<unknown>): Accessor<string> {
  return createMemo(() => `${unAccessor(value)}`)
}
