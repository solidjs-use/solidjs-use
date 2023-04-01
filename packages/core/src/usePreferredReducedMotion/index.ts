import { createMemo } from 'solid-js'
import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'

export type ReducedMotionType = 'reduce' | 'no-preference'

/**
 * Reactive prefers-reduced-motion media query.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/usePreferredReducedMotion
 */
export function usePreferredReducedMotion(options?: ConfigurableWindow) {
  const isReduced = useMediaQuery('(prefers-reduced-motion: reduce)', options)

  return createMemo<ReducedMotionType>(() => {
    if (isReduced()) return 'reduce'
    return 'no-preference'
  })
}
