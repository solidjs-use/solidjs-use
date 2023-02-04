import { resolveAccessor, unAccessor } from '@solidjs-use/shared'
import { createEffect, createSignal, on } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { MaybeAccessor, MaybeElementAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseElementVisibilityOptions extends ConfigurableWindow {
  scrollTarget?: MaybeAccessor<HTMLElement | undefined | null>
}

/**
 * Tracks the visibility of an element within the viewport.
 */
export function useElementVisibility(
  element: MaybeElementAccessor,
  { window = defaultWindow, scrollTarget }: UseElementVisibilityOptions = {}
) {
  const [elementIsVisible, setElementIsVisible] = createSignal(false)

  const testBounding = () => {
    if (!window) return

    const document = window.document
    const el = unAccessor(element)
    if (!el) {
      setElementIsVisible(false)
    } else {
      const rect = el.getBoundingClientRect()
      setElementIsVisible(
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
          rect.bottom >= 0 &&
          rect.right >= 0
      )
    }
  }

  createEffect(
    on(resolveAccessor(element), () => {
      testBounding()
    })
  )

  if (window) {
    useEventListener(scrollTarget ?? window, 'scroll', testBounding, {
      capture: false,
      passive: true
    })
  }

  return elementIsVisible
}
