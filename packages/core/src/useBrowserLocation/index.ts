import { createEffect, createSignal, on } from 'solid-js'
import { objectEntries } from '@solidjs-use/shared'
import { createMutable } from 'solid-js/store'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { Signal, Accessor, Setter } from 'solid-js'
import type { ConfigurableWindow } from '../_configurable'

const WRITABLE_PROPERTIES = ['hash', 'host', 'hostname', 'href', 'pathname', 'port', 'protocol', 'search'] as const

export interface BrowserLocationState {
  trigger: string
  state?: any
  length?: number
  origin?: string
  hash: Accessor<string | undefined>
  setHash: Setter<string | undefined>
  host: Accessor<string | undefined>
  setHost: Setter<string | undefined>
  hostname: Accessor<string | undefined>
  setHostname: Setter<string | undefined>
  href: Accessor<string | undefined>
  setHref: Setter<string | undefined>
  pathname: Accessor<string | undefined>
  setPathname: Setter<string | undefined>
  port: Accessor<string | undefined>
  setPort: Setter<string | undefined>
  protocol: Accessor<string | undefined>
  setProtocol: Setter<string | undefined>
  search: Accessor<string | undefined>
  setSearch: Setter<string | undefined>
}

/**
 * Reactive browser location.
 */
export function useBrowserLocation({ window = defaultWindow }: ConfigurableWindow = {}) {
  const signals = Object.fromEntries(WRITABLE_PROPERTIES.map(key => [key, createSignal()])) as Record<
    (typeof WRITABLE_PROPERTIES)[number],
    Signal<string | undefined>
  >

  for (const [key, sg] of objectEntries(signals)) {
    createEffect(
      on(sg[0], value => {
        if (!window?.location || window.location[key] === value) return
        window.location[key] = value!
      })
    )
  }

  const buildState = (trigger: string): BrowserLocationState => {
    const { state, length } = window?.history ?? {}
    const { origin } = window?.location ?? {}

    for (const key of WRITABLE_PROPERTIES) signals[key][1](window?.location?.[key])

    return {
      trigger,
      state,
      length,
      origin,
      hash: signals.hash[0],
      setHash: signals.hash[1],
      host: signals.host[0],
      setHost: signals.host[1],
      hostname: signals.hostname[0],
      setHostname: signals.hostname[1],
      href: signals.href[0],
      setHref: signals.href[1],
      pathname: signals.pathname[0],
      setPathname: signals.pathname[1],
      port: signals.port[0],
      setPort: signals.port[1],
      protocol: signals.protocol[0],
      setProtocol: signals.protocol[1],
      search: signals.search[0],
      setSearch: signals.search[1]
    }
  }

  const state = createMutable(buildState('load'))

  if (window) {
    useEventListener(window, 'popstate', () => Object.assign(state, buildState('popstate')), { passive: true })
    useEventListener(window, 'hashchange', () => Object.assign(state, buildState('hashchange')), { passive: true })
  }

  return state
}

export type UseBrowserLocationReturn = ReturnType<typeof useBrowserLocation>
