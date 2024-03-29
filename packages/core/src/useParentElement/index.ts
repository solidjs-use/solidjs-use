import { createEffect, createSignal, on } from 'solid-js'
import { toAccessor, tryOnMount, toValue } from '@solidjs-use/shared'
import { useActiveElement } from '../useActiveElement'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { Accessor } from 'solid-js'

/**
 * Get parent element of the given element.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useParentElement
 */
export function useParentElement(
  element: MaybeAccessor<HTMLElement | SVGElement | null | undefined> = useActiveElement()
): Accessor<HTMLElement | SVGElement | null | undefined> {
  const [parentElement, setParentElement] = createSignal<HTMLElement | SVGElement | null | undefined>()

  const update = () => {
    const el = toValue(element)
    if (el) setParentElement(el.parentElement)
  }

  tryOnMount(update)
  createEffect(on(toAccessor(element), update))

  return parentElement
}
