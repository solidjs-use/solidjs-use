import { createEffect, on, createSignal } from 'solid-js'
import { timestamp } from '../utils'
import type { OnOptions } from 'solid-js/types/reactive/signal'
import type { EffectOnDeps } from '../utils'
import type { Accessor } from 'solid-js'

export interface UseLastChangedOptions<InitialValue extends number | null | undefined = undefined> extends OnOptions {
  initialValue?: InitialValue
}

/**
 * Records the timestamp of the last change
 */
export function useLastChanged<T>(deps: EffectOnDeps<T>, options?: UseLastChangedOptions): Accessor<number | null>
export function useLastChanged<T>(deps: EffectOnDeps<T>, options: UseLastChangedOptions): Accessor<number>
export function useLastChanged<T>(deps: EffectOnDeps<T>, options: UseLastChangedOptions<number>): Accessor<number>
export function useLastChanged<T>(
  deps: EffectOnDeps<T>,
  options: UseLastChangedOptions<any> = {}
): Accessor<number | null> | Accessor<number> {
  const [ms, setMs] = createSignal<number | null>(options.initialValue ?? null)

  createEffect(
    on(
      deps,
      () => {
        setMs(timestamp())
      },
      { defer: options.defer as any }
    )
  )

  return ms
}
