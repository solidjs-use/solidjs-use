import { nextTick } from '@solidjs-use/solid-to-vue'
import { watch } from '../watch'
import type { WatchCallback, WatchOptions, WatchSource } from '../watch'
import type { MapOldSources, MapSources } from '../utils'

// overloads
export function watchOnce<T extends Readonly<Array<WatchSource<unknown>>>>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T>>,
  options?: WatchOptions
): void

export function watchOnce<T>(sources: WatchSource<T>, cb: WatchCallback<T>, options?: WatchOptions): void

/**
 * `watch` that only triggers once.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/watchOnce
 */
export function watchOnce(source: any, cb: any, options: WatchOptions = { defer: true }): void {
  const stop = watch(
    source,
    (...args) => {
      nextTick(() => stop())

      return cb(...args)
    },
    options
  )
}
