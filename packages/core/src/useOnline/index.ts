import { useNetwork } from '../useNetwork'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive online state.
 */
export function useOnline(options: ConfigurableWindow = {}) {
  const { isOnline } = useNetwork(options)
  return isOnline
}
