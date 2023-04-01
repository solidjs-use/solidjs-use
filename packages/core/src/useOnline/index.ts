import { useNetwork } from '../useNetwork'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive online state.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useOnline
 */
export function useOnline(options: ConfigurableWindow = {}) {
  const { isOnline } = useNetwork(options)
  return isOnline
}
