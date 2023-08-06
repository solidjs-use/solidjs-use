/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { toAccessor, toValue, tryOnCleanup, watch } from "@solidjs-use/shared"
import { createSignal } from "solid-js"
import { useSupported } from "../useSupported"
import { defaultWindow } from "../_configurable"
import type { MaybeAccessor } from "@solidjs-use/shared"
import type { ConfigurableWindow } from "../_configurable"

/**
 * Reactive Media Query.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMediaQuery
 */
export function useMediaQuery(query: MaybeAccessor<string>, options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options
  const isSupported = useSupported(
    () => window && "matchMedia" in window && typeof window.matchMedia === "function"
  )

  let mediaQuery: MediaQueryList | undefined
  const [matches, setMatches] = createSignal(false)
  const handler = (event: MediaQueryListEvent) => {
    setMatches(event.matches)
  }

  const cleanup = () => {
    if (!mediaQuery) return
    if ("removeEventListener" in mediaQuery) mediaQuery.removeEventListener("change", handler)
    // @ts-expect-error deprecated API
    else mediaQuery.removeListener(handler)
  }
  const stopWatch = watch([toAccessor(query), isSupported], () => {
    if (!isSupported()) return

    cleanup()

    mediaQuery = window!.matchMedia(toValue(query))

    if ("addEventListener" in mediaQuery) mediaQuery.addEventListener("change", handler)
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(handler)

    setMatches(mediaQuery.matches)
  })

  tryOnCleanup(() => {
    stopWatch()
    cleanup()
    mediaQuery = undefined
  })

  return matches
}
