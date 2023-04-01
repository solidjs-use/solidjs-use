import { pausableFilter, watchIgnorable } from '@solidjs-use/shared'
import { toSignal } from '@solidjs-use/shared/solid-to-vue'
import { useManualHistoryTravel } from '../useManualHistoryTravel'
import type {
  UseManualHistoryTravelSignalReturn,
  UseManualHistoryTravelAccessorReturn
} from '../useManualHistoryTravel'
import type { ConfigurableEventFilter, Fn } from '@solidjs-use/shared'
import type { Accessor, Setter, Signal } from 'solid-js'
import type { CloneFn } from '../useCloned'

export interface UseHistoryTravelOptions<Raw, Serialized = Raw> extends ConfigurableEventFilter {
  /**
   * Maximum number of history to be kept. Default to unlimited.
   */
  capacity?: number
  /**
   * Clone when taking a snapshot, shortcut for dump: JSON.parse(JSON.stringify(value)).
   * Default to false
   *
   * @default false
   */
  clone?: boolean | CloneFn<Raw>
  /**
   * Serialize data into the history
   */
  dump?: (v: Raw) => Serialized
  /**
   * Deserialize data from the history
   */
  parse?: (v: Serialized) => Raw
}

export interface UseHistoryTravelBaseReturn {
  /**
   * A Accessor representing if the tracking is enabled
   */
  isTracking: Accessor<boolean>

  /**
   * Pause change tracking
   */
  pause: () => void

  /**
   * Resume change tracking
   *
   * @param [commit] if true, a history record will be create after resuming
   */
  resume: (commit?: boolean) => void

  /**
   * A sugar for auto pause and auto resuming within a function scope
   *
   * @param fn
   */
  batch: (fn: (cancel: Fn) => void) => void

  /**
   * Clear the data and stop the watch
   */
  dispose: () => void
}

export type UseHistoryTravelAccessorReturn<Raw, Serialized> = UseHistoryTravelBaseReturn &
  UseManualHistoryTravelAccessorReturn<Raw, Serialized>

export type UseHistoryTravelSignalReturn<Raw, Serialized> = UseHistoryTravelBaseReturn &
  UseManualHistoryTravelSignalReturn<Raw, Serialized>

/**
 * Track the change history of a `Signal` or `Accessor`, when the parameter is a Signal, it provides undo and redo functionality.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useHistoryTravel
 */
export function useHistoryTravel<Raw, Serialized = Raw>(
  source: Accessor<Raw>,
  options?: UseHistoryTravelOptions<Raw, Serialized>
): UseHistoryTravelAccessorReturn<Raw, Serialized>
export function useHistoryTravel<Raw, Serialized = Raw>(
  source: Signal<Raw>,
  options?: UseHistoryTravelOptions<Raw, Serialized>
): UseHistoryTravelSignalReturn<Raw, Serialized>
export function useHistoryTravel<Raw, Serialized = Raw>(
  source: any,
  options: UseHistoryTravelOptions<Raw, Serialized> = {}
) {
  const { eventFilter } = options
  const [sourceAccessor] = toSignal(source)
  const {
    eventFilter: composedFilter,
    pause,
    resume: resumeTracking,
    isActive: isTracking
  } = pausableFilter(eventFilter)

  const { ignoreUpdates, stop } = watchIgnorable(sourceAccessor, commit, { eventFilter: composedFilter, defer: true })

  function setSource(setSource: Setter<Raw>, value: Raw) {
    ignoreUpdates(() => {
      setSource(value as any)
    })
  }

  const manualHistory = useManualHistoryTravel(source, { ...options, clone: options.clone, setSource })

  const { clear, commit: manualCommit } = manualHistory

  function commit() {
    manualCommit()
  }

  function resume(commitNow?: boolean) {
    resumeTracking()
    if (commitNow) commit()
  }

  function batch(fn: (cancel: Fn) => void) {
    let canceled = false

    const cancel = () => (canceled = true)

    ignoreUpdates(() => {
      fn(cancel)
    })

    if (!canceled) commit()
  }

  function dispose() {
    stop()
    clear()
  }
  return {
    ...manualHistory,
    isTracking,
    pause,
    resume,
    commit,
    batch,
    dispose
  }
}
