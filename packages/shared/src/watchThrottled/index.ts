import { throttleFilter } from '../utils'
import { watchWithFilter } from '../watchWithFilter'
import type { MapOldSources, MapSources, MaybeAccessor } from '../utils'
import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from '../watch'

export interface WatchThrottledOptions extends WatchOptions {
  throttle?: MaybeAccessor<number>
  trailing?: boolean
  leading?: boolean
}

// overloads
export function watchThrottled<T extends Readonly<Array<WatchSource<unknown>>>>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T>>,
  options?: WatchThrottledOptions
): WatchStopHandle
export function watchThrottled<T>(
  source: WatchSource<T>,
  cb: WatchCallback<T>,
  options?: WatchThrottledOptions
): WatchStopHandle
export function watchThrottled<T extends object>(
  source: T,
  cb: WatchCallback<T>,
  options?: WatchThrottledOptions
): WatchStopHandle

/**
 * Similar to `watch`, but offering an extra option `throttle` which will be applied to the callback function.
 *
 * @see https://solidjs-use.github.io/solidjs-use/shared/watchThrottled
 */
export function watchThrottled(source: any, cb: any, options: WatchThrottledOptions = {}): WatchStopHandle {
  const { throttle = 0, trailing = true, leading = true, defer = true } = options

  return watchWithFilter(source, cb, {
    defer,
    eventFilter: throttleFilter(throttle, trailing, leading)
  })
}

// alias
export { watchThrottled as throttledWatch }
