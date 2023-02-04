import { bypassFilter, createFilterWrapper } from '../utils'
import { watch } from '../watch'
import type { WatchCallback, WatchDeps, WatchStopHandle } from '../watch'
import type { OnOptions } from 'solid-js/types/reactive/signal'
import type { ConfigurableEventFilter, MapOldSources, MapSources } from '../utils'

export interface WatchWithFilterOptions extends OnOptions, ConfigurableEventFilter {}

// overloads
export function watchWithFilter<T extends Readonly<Array<WatchDeps<unknown>>>>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T>>,
  options?: WatchWithFilterOptions
): WatchStopHandle
export function watchWithFilter<T>(
  source: WatchDeps<T>,
  cb: WatchCallback<T, T>,
  options?: WatchWithFilterOptions
): WatchStopHandle
export function watchWithFilter<T extends object>(
  source: T,
  cb: WatchCallback<T, T>,
  options?: WatchWithFilterOptions
): WatchStopHandle

// implementation
export function watchWithFilter(source: any, cb: any, options: WatchWithFilterOptions = {}): WatchStopHandle {
  const { eventFilter = bypassFilter, ...watchOptions } = options

  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions)
}
