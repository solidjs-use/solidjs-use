import { createMemo } from 'solid-js'
import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'

export type ContrastType = 'more' | 'less' | 'custom' | 'no-preference'

/**
 * Reactive prefers-contrast media query.
 */
export function usePreferredContrast(options?: ConfigurableWindow) {
  const isMore = useMediaQuery('(prefers-contrast: more)', options)
  const isLess = useMediaQuery('(prefers-contrast: less)', options)
  const isCustom = useMediaQuery('(prefers-contrast: custom)', options)

  return createMemo<ContrastType>(() => {
    if (isMore()) return 'more'
    if (isLess()) return 'less'
    if (isCustom()) return 'custom'
    return 'no-preference'
  })
}
