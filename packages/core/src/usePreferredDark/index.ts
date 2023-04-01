import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive dark theme preference.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/usePreferredDark
 */
export function usePreferredDark(options?: ConfigurableWindow) {
  return useMediaQuery('(prefers-color-scheme: dark)', options)
}
