import { tryOnMount } from "@solidjs-use/shared"
import { createEffect, createSignal, on } from "solid-js"
import { useEventListener } from "../useEventListener"
import { defaultWindow } from "../_configurable"
import { useMediaQuery } from "../useMediaQuery"
import type { ConfigurableWindow } from "../_configurable"

export interface UseWindowSizeOptions extends ConfigurableWindow {
  initialWidth?: number
  initialHeight?: number
  /**
   * Listen to window `orientationchange` event
   *
   * @default true
   */
  listenOrientation?: boolean

  /**
   * Whether the scrollbar should be included in the width and height
   * @default true
   */
  includeScrollbar?: boolean
}

/**
 * Reactive window size.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useWindowSize
 */
export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    window = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true
  } = options

  const [width, setWidth] = createSignal(initialWidth)
  const [height, setHeight] = createSignal(initialHeight)

  const update = () => {
    if (window) {
      if (includeScrollbar) {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      } else {
        setWidth(window.document.documentElement.clientWidth)
        setHeight(window.document.documentElement.clientHeight)
      }
    }
  }

  update()
  tryOnMount(update)
  useEventListener("resize", update, { passive: true })

  if (listenOrientation) {
    const matches = useMediaQuery("(orientation: portrait)")
    createEffect(
      on(matches, () => {
        update()
      })
    )
  }

  return { width, height }
}

export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>
