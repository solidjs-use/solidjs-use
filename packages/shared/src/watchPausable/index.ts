import { pausableFilter } from '../utils'
import { watchWithFilter } from '../watchWithFilter'
import type { MapOldSources, MapSources, Pausable } from '../utils'
import type { WatchCallback, WatchSource, WatchStopHandle } from '../watch'
import type { WatchWithFilterOptions } from '../watchWithFilter'

export interface WatchPausableReturn extends Pausable {
  stop: WatchStopHandle
}

// overloads
export function watchPausable<T extends Readonly<Array<WatchSource<unknown>>>>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T>>,
  options?: WatchWithFilterOptions
): WatchPausableReturn
export function watchPausable<T>(
  source: WatchSource<T>,
  cb: WatchCallback<T>,
  options?: WatchWithFilterOptions
): WatchPausableReturn
export function watchPausable<T extends object>(
  source: T,
  cb: WatchCallback<T>,
  options?: WatchWithFilterOptions
): WatchPausableReturn

// implementation
export function watchPausable(source: any, cb: any, options: WatchWithFilterOptions = {}): WatchPausableReturn {
  const { eventFilter: filter, defer = true } = options

  const { eventFilter, pause, resume, isActive } = pausableFilter(filter)
  const stop = watchWithFilter(source, cb, {
    defer,
    eventFilter
  })

  return { stop, pause, resume, isActive }
}

// alias
export { watchPausable as pausableWatch }
