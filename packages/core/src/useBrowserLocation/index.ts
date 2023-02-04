import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

export interface BrowserLocationState {
  trigger: string
  state?: any
  length?: number
  hash?: string
  host?: string
  hostname?: string
  href?: string
  origin?: string
  pathname?: string
  port?: string
  protocol?: string
  search?: string
}

/**
 * Reactive browser location.
 */
export function useBrowserLocation({ window = defaultWindow }: ConfigurableWindow = {}) {
  const buildState = (trigger: string): BrowserLocationState => {
    const { state, length } = window?.history ?? {}
    const { hash, host, hostname, href, origin, pathname, port, protocol, search } = window?.location ?? {}

    return {
      trigger,
      state,
      length,
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    }
  }

  const [state, setState] = createSignal(buildState('load'))

  if (window) {
    useEventListener(window, 'popstate', () => setState(buildState('popstate')), { passive: true })
    useEventListener(window, 'hashchange', () => setState(buildState('hashchange')), { passive: true })
  }

  return state
}

export type UseBrowserLocationReturn = ReturnType<typeof useBrowserLocation>
