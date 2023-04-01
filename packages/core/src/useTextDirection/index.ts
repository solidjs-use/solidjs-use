import { tryOnMount } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useMutationObserver } from '../useMutationObserver'
import { defaultDocument } from '../_configurable'
import type { MaybeElement } from '@solidjs-use/shared'
import type { ConfigurableDocument } from '../_configurable'

export type UseTextDirectionValue = 'ltr' | 'rtl' | 'auto'

export interface UseTextDirectionOptions extends ConfigurableDocument {
  /**
   * CSS Selector for the target element applying to
   *
   * @default 'html'
   */
  selector?: string
  /**
   * Observe `document.querySelector(selector)` changes using MutationObserve
   *
   * @default false
   */
  observe?: boolean
  /**
   * Initial value
   *
   * @default 'ltr'
   */
  initialValue?: UseTextDirectionValue
}

/**
 * Reactive dir of the element's text.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useTextDirection
 */
export function useTextDirection(options: UseTextDirectionOptions = {}) {
  const { document = defaultDocument, selector = 'html', observe = false, initialValue = 'ltr' } = options

  function getValue() {
    return (document?.querySelector(selector)?.getAttribute('dir') as UseTextDirectionValue) ?? initialValue
  }

  const [dir, setDir] = createSignal<UseTextDirectionValue>(getValue())

  tryOnMount(() => setDir(getValue()))

  if (observe && document) {
    useMutationObserver(document.querySelector(selector) as MaybeElement, () => setDir(getValue()), {
      attributes: true
    })
  }

  return {
    dir,
    setDir: (v: UseTextDirectionValue) => {
      setDir(v)
      if (!document) return
      if (dir()) document.querySelector(selector)?.setAttribute('dir', dir())
      else document.querySelector(selector)?.removeAttribute('dir')
    }
  }
}
