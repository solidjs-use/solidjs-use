import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'

export function usePreferredDark(options?: ConfigurableWindow) {
  return useMediaQuery('(prefers-color-scheme: dark)', options)
}
