import { createEffect, createSignal, on } from 'solid-js'
import { resolveAccessor, tryOnMount, unAccessor } from '@solidjs-use/shared'
import { useActiveElement } from '../useActiveElement'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { Accessor } from 'solid-js'

export function useParentElement(
  element: MaybeAccessor<HTMLElement | SVGElement | null | undefined> = useActiveElement()
): Accessor<HTMLElement | SVGElement | null | undefined> {
  const [parentElement, setParentElement] = createSignal<HTMLElement | SVGElement | null | undefined>()

  const update = () => {
    const el = unAccessor(element)
    if (el) setParentElement(el.parentElement)
  }

  tryOnMount(update)
  createEffect(on(resolveAccessor(element), update))

  return parentElement
}
