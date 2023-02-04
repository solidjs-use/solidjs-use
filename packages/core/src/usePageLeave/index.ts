import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive state to show whether mouse leaves the page.
 */
export function usePageLeave(options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options
  const [isLeft, setIsLeft] = createSignal(false)

  const handler = (event: MouseEvent) => {
    if (!window) return

    event = event || (window.event as any)
    // @ts-expect-error missing types
    const from = event.relatedTarget ?? event.toElement
    setIsLeft(!from)
  }

  if (window) {
    useEventListener(window, 'mouseout', handler, { passive: true })
    useEventListener(window.document, 'mouseleave', handler, { passive: true })
    useEventListener(window.document, 'mouseenter', handler, { passive: true })
  }

  return isLeft
}
