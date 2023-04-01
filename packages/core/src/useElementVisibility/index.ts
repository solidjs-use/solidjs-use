import { createSignal } from 'solid-js'
import { useIntersectionObserver } from '../useIntersectionObserver'
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
  useIntersectionObserver(
    element,
    ([{ isIntersecting }]) => {
      setElementIsVisible(isIntersecting)
    },
    {
      root: scrollTarget,
      window
    }
  )

  return elementIsVisible
}
