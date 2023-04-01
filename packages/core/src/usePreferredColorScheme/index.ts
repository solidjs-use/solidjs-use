import { createMemo } from 'solid-js'
import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'

export type ColorSchemeType = 'dark' | 'light' | 'no-preference'

/**
 * Reactive prefers-color-scheme media query.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/usePreferredColorScheme
 */
export function usePreferredColorScheme(options?: ConfigurableWindow) {
  const isLight = useMediaQuery('(prefers-color-scheme: light)', options)
  const isDark = useMediaQuery('(prefers-color-scheme: dark)', options)

  return createMemo<ColorSchemeType>(() => {
    if (isDark()) return 'dark'
    if (isLight()) return 'light'
    return 'no-preference'
  })
}
