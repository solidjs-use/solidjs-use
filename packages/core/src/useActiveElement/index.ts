import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow, ConfigurableDocumentOrShadowRoot } from '../_configurable'

export interface UseActiveElementOptions extends ConfigurableWindow, ConfigurableDocumentOrShadowRoot {}

/**
 * Reactive `document.activeElement`
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useActiveElement
 */
export function useActiveElement<T extends HTMLElement>(options: UseActiveElementOptions = {}) {
  const { window = defaultWindow } = options
  const document = options.document ?? window?.document
  const [activeElement, setActiveElement] = createSignal<T | null | undefined>(
    document?.activeElement as T | null | undefined
  )

  if (window) {
    useEventListener(
      window,
      'blur',
      event => {
        if (event.relatedTarget !== null) return

        setActiveElement(() => document?.activeElement as T)
      },
      true
    )
    useEventListener(
      window,
      'focus',
      () => {
        setActiveElement(() => document?.activeElement as T)
      },
      true
    )
  }

  return activeElement
}
