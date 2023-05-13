import { toValue, useIntervalFn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useRafFn } from '../useRafFn'
import { defaultDocument } from '../_configurable'
import { useSupported } from '../useSupported'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor, Pausable } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

export interface UseElementByPointOptions<Multiple extends boolean = false> extends ConfigurableDocument {
  x: MaybeAccessor<number>
  y: MaybeAccessor<number>
  multiple?: MaybeAccessor<Multiple>
  immediate?: boolean
  interval?: 'requestAnimationFrame' | number
}

export interface UseElementByPointReturn<Multiple extends boolean = false> extends Pausable {
  isSupported: Accessor<boolean>
  element: Accessor<Multiple extends true ? HTMLElement[] : HTMLElement | null>
}

/**
 * Reactive element by point.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useElementByPoint
 */
export function useElementByPoint<M extends boolean = false>(
  options: UseElementByPointOptions<M>
): UseElementByPointReturn<M> {
  const { x, y, document = defaultDocument, multiple, interval = 'requestAnimationFrame', immediate = true } = options

  const isSupported = useSupported(() => {
    if (toValue(multiple)) return document && 'elementsFromPoint' in document

    return document && 'elementFromPoint' in document
  })

  const [element, setElement] = createSignal<any>(null)

  const cb = () => {
    setElement(
      toValue(multiple)
        ? document?.elementsFromPoint(toValue(x), toValue(y)) ?? []
        : document?.elementFromPoint(toValue(x), toValue(y)) ?? null
    )
  }

  const controls: Pausable =
    interval === 'requestAnimationFrame' ? useRafFn(cb, { immediate }) : useIntervalFn(cb, interval, { immediate })

  return {
    isSupported,
    element,
    ...controls
  }
}
