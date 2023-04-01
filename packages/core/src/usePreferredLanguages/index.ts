import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive Navigator Languages.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/usePreferredLanguages
 */
export function usePreferredLanguages(options: ConfigurableWindow = {}): Accessor<readonly string[]> {
  const { window = defaultWindow } = options
  if (!window) {
    const [en] = createSignal(['en'])
    return en
  }

  const navigator = window.navigator
  const [value, setValue] = createSignal(navigator.languages)

  useEventListener(window, 'languagechange', () => {
    setValue(navigator.languages)
  })

  return value
}
