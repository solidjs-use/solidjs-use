import { debounceFilter } from '../utils'
import { watchWithFilter } from '../watchWithFilter'
import type { DebounceFilterOptions, MapOldSources, MapSources, MaybeAccessor } from '../utils'
import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from '../watch'

export interface WatchDebouncedOptions extends WatchOptions, DebounceFilterOptions {
  debounce?: MaybeAccessor<number>
}

// overloads
export function watchDebounced<T extends Readonly<Array<WatchSource<unknown>>>>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T>>,
  options?: WatchDebouncedOptions
): WatchStopHandle
export function watchDebounced<T>(
  source: WatchSource<T>,
  cb: WatchCallback<T>,
  options?: WatchDebouncedOptions
): WatchStopHandle
export function watchDebounced<T extends object>(
  source: T,
  cb: WatchCallback<T>,
  options?: WatchDebouncedOptions
): WatchStopHandle

// implementation
export function watchDebounced(source: any, cb: any, options: WatchDebouncedOptions = {}): WatchStopHandle {
  const { debounce = 0, maxWait = undefined, defer = true } = options

  return watchWithFilter(source, cb, {
    defer,
    eventFilter: debounceFilter(debounce, { maxWait })
  })
}

// alias
export { watchDebounced as debouncedWatch }
