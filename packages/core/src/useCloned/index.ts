import { toValue, type MaybeAccessor } from '@solidjs-use/shared'
import { isAccessor } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createSignal, on } from 'solid-js'
import type { Accessor } from 'solid-js'
import type { OnOptions } from 'solid-js/types/reactive/signal'

export interface UseClonedOptions<T = any> extends OnOptions {
  /**
   * Custom clone function.
   *
   * By default, it use `JSON.parse(JSON.stringify(value))` to clone.
   */
  clone?: (source: T) => T

  /**
   * Manually sync the Accessor
   *
   * @default false
   */
  manual?: boolean
}

export interface UseClonedReturn<T> {
  /**
   * Cloned Accessor
   */
  cloned: Accessor<T>
  /**
   * Sync cloned data with source manually
   */
  sync: () => void
}

export type CloneFn<F, T = F> = (x: F) => T

export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}

/**
 * Reactive clone of a Accessor.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useCloned
 */
export function useCloned<T>(source: MaybeAccessor<T>, options: UseClonedOptions = {}) {
  const [cloned, setCloned] = createSignal<T>({} as T)
  const { manual, clone = cloneFnJSON, defer = false } = options

  function sync() {
    setCloned(clone(toValue(source)))
  }

  if (!manual && isAccessor(source)) {
    createEffect(on(source, sync, { defer: defer as true }))
  } else {
    sync()
  }

  return { cloned, setCloned, sync }
}
