import { debounceFilter } from '@solidjs-use/shared'
import { useHistoryTravel } from '../useHistoryTravel'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { Accessor, Signal } from 'solid-js'
import type {
  UseHistoryTravelOptions,
  UseHistoryTravelAccessorReturn,
  UseHistoryTravelSignalReturn
} from '../useHistoryTravel'

export type UseDebouncedHistoryTravelAccessorReturn<Raw, Serialized = Raw> = UseHistoryTravelAccessorReturn<
  Raw,
  Serialized
>
export type UseDebouncedHistoryTravelSignalReturn<Raw, Serialized = Raw> = UseHistoryTravelSignalReturn<Raw, Serialized>

/**
 * Shorthand for `useHistoryTravel` with debounce filter.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDebouncedHistoryTravel
 */
export function useDebouncedHistoryTravel<Raw, Serialized = Raw>(
  source: Accessor<Raw>,
  options?: Omit<UseHistoryTravelOptions<Raw, Serialized>, 'eventFilter'> & { debounce?: MaybeAccessor<number> }
): UseDebouncedHistoryTravelAccessorReturn<Raw, Serialized>
export function useDebouncedHistoryTravel<Raw, Serialized = Raw>(
  source: Signal<Raw>,
  options?: Omit<UseHistoryTravelOptions<Raw, Serialized>, 'eventFilter'> & { debounce?: MaybeAccessor<number> }
): UseDebouncedHistoryTravelSignalReturn<Raw, Serialized>
export function useDebouncedHistoryTravel<Raw, Serialized = Raw>(
  source: any,
  options: Omit<UseHistoryTravelOptions<Raw, Serialized>, 'eventFilter'> & { debounce?: MaybeAccessor<number> } = {}
) {
  const filter = options.debounce ? debounceFilter(options.debounce) : undefined
  const history = useHistoryTravel(source, { ...options, eventFilter: filter })

  return {
    ...history
  }
}
