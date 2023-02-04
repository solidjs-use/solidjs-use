import { createSignal } from 'solid-js'
import { bypassFilter, createFilterWrapper } from '../utils'
import { watch } from '../watch'
import type { OnOptions } from 'solid-js/types/reactive/signal'
import type { ConfigurableEventFilter } from '../utils'
import type { WatchCallback, WatchDeps, WatchStopHandle } from '../watch'

export interface EffectWithFilterOptions extends OnOptions, ConfigurableEventFilter {}

export type IgnoredUpdater = (updater: () => void) => void

export interface WatchIgnorableReturn {
  ignoreUpdates: IgnoredUpdater
  stop: WatchStopHandle
}

export function watchIgnorable<S, Next extends Prev, Prev = Next>(
  source: WatchDeps<S>,
  cb: WatchCallback<S, Next, Prev>,
  options: EffectWithFilterOptions = {}
): WatchIgnorableReturn {
  const { defer = true, eventFilter = bypassFilter } = options

  const filteredCb = createFilterWrapper(eventFilter, cb)

  const [ignore, setIgnore] = createSignal(false)
  const ignoreUpdates = (updater: () => void) => {
    // Call the updater function and count how many sync updates are performed,
    // then add them to the ignore count
    setIgnore(true)
    updater()
    setIgnore(false)
  }

  const stop = watch<S, Next, Prev>(
    source,
    (input, prevInput, prev) => {
      if (!ignore()) {
        filteredCb(input, prevInput, prev)
      }
    },
    { defer }
  )

  return { stop, ignoreUpdates }
}

// alias
export { watchIgnorable as ignorableEffect }
