import { nextTick } from '@solidjs-use/solid-to-vue'
import { createSignal } from 'solid-js'
import { unAccessor } from '../unAccessor'
import { watchWithFilter } from '../watchWithFilter'
import type { Accessor } from 'solid-js'
import type { MapOldSources, MapSources, MaybeAccessor } from '../utils'
import type { WatchCallback, WatchSource, WatchStopHandle } from '../watch'
import type { WatchWithFilterOptions } from '../watchWithFilter'

export interface WatchAtMostOptions extends WatchWithFilterOptions {
  count: MaybeAccessor<number>
}

export interface WatchAtMostReturn {
  stop: WatchStopHandle
  count: Accessor<number>
}

// overloads
export function watchAtMost<T extends Readonly<Array<WatchSource<unknown>>>>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T>>,
  options: WatchAtMostOptions
): WatchAtMostReturn

export function watchAtMost<T>(
  sources: WatchSource<T>,
  cb: WatchCallback<T>,
  options: WatchAtMostOptions
): WatchAtMostReturn

/**
 * `watch` with the number of times triggered.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/watchAtMost
 */
export function watchAtMost(source: any, cb: any, options: WatchAtMostOptions): WatchAtMostReturn {
  const { count, ...watchOptions } = options

  const [current, setCurrent] = createSignal(0)

  const stop = watchWithFilter(
    source,
    (...args) => {
      setCurrent(current => current + 1)
      if (current() >= unAccessor(count)) nextTick(() => stop())

      cb(...args)
    },
    watchOptions
  )

  return { count: current, stop }
}
