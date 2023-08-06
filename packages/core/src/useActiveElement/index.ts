import { createSignal } from "solid-js"
import { useEventListener } from "../useEventListener"
import { defaultWindow } from "../_configurable"
import type { ConfigurableWindow, ConfigurableDocumentOrShadowRoot } from "../_configurable"

export interface UseActiveElementOptions
  extends ConfigurableWindow,
    ConfigurableDocumentOrShadowRoot {
  /**
   * Search active element deeply inside shadow dom
   *
   * @default true
   */
  deep?: boolean
}

/**
 * Reactive `document.activeElement`
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useActiveElement
 */
export function useActiveElement<T extends HTMLElement>(options: UseActiveElementOptions = {}) {
  const { window = defaultWindow, deep = true } = options
  const document = options.document ?? window?.document
  const getDeepActiveElement = () => {
    let element = document?.activeElement
    if (deep) {
      while (element?.shadowRoot) element = element?.shadowRoot?.activeElement
    }
    return element
  }

  const [activeElement, setActiveElement] = createSignal<T | null | undefined>(
    getDeepActiveElement() as T | null | undefined
  )

  if (window) {
    useEventListener(
      window,
      "blur",
      event => {
        if (event.relatedTarget !== null) return

        setActiveElement(() => document?.activeElement as T)
      },
      true
    )
    useEventListener(
      window,
      "focus",
      () => {
        setActiveElement(() => document?.activeElement as T)
      },
      true
    )
  }

  return activeElement
}
