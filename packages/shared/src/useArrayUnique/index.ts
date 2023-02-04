import { createMemo } from 'solid-js'
import { unAccessor } from '../unAccessor'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../utils'

/**
 * reactive unique array
 */
export function useArrayUnique<T>(list: MaybeAccessor<Array<MaybeAccessor<T>>>): Accessor<T[]> {
  return createMemo<T[]>(() => [...new Set<T>(unAccessor(list).map(element => unAccessor(element)))])
}
