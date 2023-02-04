import { unAccessor } from '../unAccessor'
import { watchIgnorable } from '../watchIgnorable'
import type { MapOldSources, MapSources } from '../utils'
import type { WatchDeps } from '../watch'
import type { WatchIgnorableReturn } from '../watchIgnorable'
import type { WatchWithFilterOptions } from '../watchWithFilter'

// Watch that can be triggered manually
// A `watch` wrapper that supports manual triggering of `WatchCallback`, which returns an additional `trigger` to execute a `WatchCallback` immediately.

export interface WatchTriggerableReturn<FnReturnT = void> extends WatchIgnorableReturn {
  /** Execute `WatchCallback` immediately */
  trigger: () => FnReturnT
}

export type WatchTriggerableCallback<V = any, OV = any, R = void> = (value: V, oldValue: OV) => R

export function watchTriggerable<T extends Readonly<Array<WatchDeps<unknown>>>, FnReturnT>(
  sources: [...T],
  cb: WatchTriggerableCallback<MapSources<T>, MapOldSources<T>, FnReturnT>,
  options?: WatchWithFilterOptions
): WatchTriggerableReturn<FnReturnT>
export function watchTriggerable<T, FnReturnT>(
  source: WatchDeps<T>,
  cb: WatchTriggerableCallback<T, T | undefined, FnReturnT>,
  options?: WatchWithFilterOptions
): WatchTriggerableReturn<FnReturnT>
export function watchTriggerable<T extends object, FnReturnT>(
  source: T,
  cb: WatchTriggerableCallback<T, T | undefined, FnReturnT>,
  options?: WatchWithFilterOptions
): WatchTriggerableReturn<FnReturnT>

export function watchTriggerable(source: any, cb: any, options: WatchWithFilterOptions = {}): WatchTriggerableReturn {
  let cleanupFn: (() => void) | undefined

  function onEffect() {
    if (!cleanupFn) return

    const fn = cleanupFn
    cleanupFn = undefined
    fn()
  }

  const _cb = (value: any, oldValue: any) => {
    // When a new side effect occurs, clean up the previous side effect
    onEffect()

    return cb(value, oldValue)
  }
  const res = watchIgnorable(source, _cb, options)
  const { ignoreUpdates } = res

  const trigger = () => {
    let res: any
    ignoreUpdates(() => {
      res = _cb(getWatchSources(source), getOldValue(source))
    })
    return res
  }

  return {
    ...res,
    trigger
  }
}

function getWatchSources(sources: any) {
  if (Array.isArray(sources)) return sources.map(item => unAccessor(item))
  return unAccessor(sources)
}

// For calls triggered by trigger, the old value is unknown, so it cannot be returned
function getOldValue(source: any) {
  return Array.isArray(source) ? source.map(() => undefined) : undefined
}
