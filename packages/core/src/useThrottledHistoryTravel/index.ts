import { throttleFilter } from '@solidjs-use/shared'
import { useHistoryTravel } from '../useHistoryTravel'
import type {
  UseHistoryTravelOptions,
  UseHistoryTravelAccessorReturn,
  UseHistoryTravelSignalReturn
} from '../useHistoryTravel'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { Accessor, Signal } from 'solid-js'

export type UseThrottledHistoryTravelOptions<Raw, Serialized = Raw> = Omit<
  UseHistoryTravelOptions<Raw, Serialized>,
  'eventFilter'
> & { throttle?: MaybeAccessor<number>; trailing?: boolean }

export type UseThrottledHistoryTravelAccessorReturn<Raw, Serialized = Raw> = UseHistoryTravelAccessorReturn<
  Raw,
  Serialized
>
export type UseThrottledHistoryTravelSignalReturn<Raw, Serialized = Raw> = UseHistoryTravelSignalReturn<Raw, Serialized>

/**
 * Shorthand for `useHistoryTravel` with throttled filter.
 */
export function useThrottledHistoryTravel<Raw, Serialized = Raw>(
  source: Accessor<Raw>,
  options?: UseThrottledHistoryTravelOptions<Raw, Serialized>
): UseThrottledHistoryTravelAccessorReturn<Raw, Serialized>
export function useThrottledHistoryTravel<Raw, Serialized = Raw>(
  source: Signal<Raw>,
  options?: UseThrottledHistoryTravelOptions<Raw, Serialized>
): UseThrottledHistoryTravelSignalReturn<Raw, Serialized>
export function useThrottledHistoryTravel<Raw, Serialized = Raw>(
  source: any,
  options: UseThrottledHistoryTravelOptions<Raw, Serialized> = {}
) {
  const { throttle = 200, trailing = true } = options
  const filter = throttleFilter(throttle, trailing)
  const history = useHistoryTravel(source, { ...options, eventFilter: filter })

  return {
    ...history
  }
}
