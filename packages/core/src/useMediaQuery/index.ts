/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { resolveAccessor, tryOnCleanup } from '@solidjs-use/shared'
import { createEffect, createSignal } from 'solid-js'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive Media Query.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMediaQuery
 */
export function useMediaQuery(query: MaybeAccessor<string>, options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options
  const isSupported = useSupported(() => window && 'matchMedia' in window && typeof window.matchMedia === 'function')

  let mediaQuery: MediaQueryList | undefined
  const [matches, setMatches] = createSignal(false)

  const cleanup = () => {
    if (!mediaQuery) return
    if ('removeEventListener' in mediaQuery)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      mediaQuery.removeEventListener('change', update)
    // @ts-expect-error deprecated API
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    else mediaQuery.removeListener(update)
  }

  const update = () => {
    if (!isSupported()) return

    cleanup()

    mediaQuery = window!.matchMedia(resolveAccessor(query)())
    setMatches(mediaQuery.matches)

    if ('addEventListener' in mediaQuery) mediaQuery.addEventListener('change', update)
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(update)
  }
  createEffect(update)

  tryOnCleanup(() => cleanup())

  return matches
}
