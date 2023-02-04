import { watch } from '../watch'
import type { WatchOptions, WatchSource } from '../watch'
import type { Setter } from 'solid-js'

/**
 * Keep target signal(s) in sync with the Signal
 */
export function syncSignals<T>(
  source: WatchSource<T>,
  targets: Setter<T> | Array<Setter<T>>,
  options: WatchOptions = {}
) {
  if (!Array.isArray(targets)) targets = [targets]

  return watch(
    source,
    newValue => {
      ;(targets as Array<Setter<T>>).forEach(setTarget => setTarget(() => newValue))
    },
    options
  )
}
