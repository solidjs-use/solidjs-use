import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactively track window focus with `window.onfocus` and `window.onblur`.
 */
export function useWindowFocus({ window = defaultWindow }: ConfigurableWindow = {}): Accessor<boolean> {
  if (!window) {
    const [res] = createSignal(false)
    return res
  }

  const [focused, setFocused] = createSignal(window.document.hasFocus())

  useEventListener(window, 'blur', () => {
    setFocused(false)
  })

  useEventListener(window, 'focus', () => {
    setFocused(true)
  })

  return focused
}
