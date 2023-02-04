import { createEffect, createSignal, on } from 'solid-js'
import { useDebounceFn } from '../useDebounceFn'
import type { Accessor } from 'solid-js'
import type { DebounceFilterOptions, MaybeAccessor } from '../utils'

/**
 * Debounce updates of a Accessor.
 */
export function accessorDebounced<T>(
  value: Accessor<T>,
  ms: MaybeAccessor<number> = 200,
  options: DebounceFilterOptions = {}
): Accessor<T> {
  const [debounced, setDebounced] = createSignal(value())

  const updater = useDebounceFn(
    () => {
      setDebounced(() => value())
    },
    ms,
    options
  )

  createEffect(
    on(
      value,
      () => {
        updater()
      },
      { defer: true }
    )
  )

  return debounced
}

// alias
export { accessorDebounced as useDebounce, accessorDebounced as debouncedAccessor }
