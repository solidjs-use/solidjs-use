import { watch } from '../watch'
import type { WatchCallback } from '../watch'
import type { Accessor, OnOptions } from 'solid-js/types/reactive/signal'

/**
 * Shorthand for watching value to be truthy
 */
export function whenever<T>(
  source: Accessor<T | false | null | undefined>,
  cb: WatchCallback<T, T | false | null | undefined, T | false | null | undefined>,
  onOptions?: OnOptions
) {
  return watch(
    source,
    (v, ov, onInvalidate) => {
      if (v) cb(v, ov as T, onInvalidate as T)
    },
    onOptions
  )
}
