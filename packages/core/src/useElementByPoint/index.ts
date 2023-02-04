import { unAccessor } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useRafFn } from '../useRafFn'
import { defaultDocument } from '../_configurable'
import type { ConfigurableDocument } from '../_configurable'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UseElementByPointOptions extends ConfigurableDocument {
  x: MaybeAccessor<number>
  y: MaybeAccessor<number>
}

/**
 * Reactive element by point.
 */
export function useElementByPoint(options: UseElementByPointOptions) {
  const [element, setElement] = createSignal<HTMLElement | null>(null)

  const { x, y, document = defaultDocument } = options

  const controls = useRafFn(() => {
    setElement(() => (document?.elementFromPoint(unAccessor(x), unAccessor(y)) ?? null) as HTMLElement | null)
  })

  return {
    element,
    ...controls
  }
}

export type UseElementByPointReturn = ReturnType<typeof useElementByPoint>
