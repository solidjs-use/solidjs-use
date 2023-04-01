/* This implementation is original ported from https://github.com/shorwood/pompaute by Stanley Horwood */

import { createEffect, createSignal } from 'solid-js'
import { resolveAccessor } from '@solidjs-use/shared'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { Accessor } from 'solid-js'

/**
 * Holds the previous value of a Accessor.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/usePrevious
 */
export function usePrevious<T>(value: MaybeAccessor<T>): Accessor<T | undefined>
export function usePrevious<T>(value: MaybeAccessor<T>, initialValue: T): Accessor<T>
export function usePrevious<T>(value: MaybeAccessor<T>, initialValue?: T) {
  const [previous, setPrevious] = createSignal<T | undefined>()

  createEffect<T, T | undefined>(v => {
    setPrevious(() => v)
    return resolveAccessor<T>(value)()
  }, initialValue)

  return previous
}
