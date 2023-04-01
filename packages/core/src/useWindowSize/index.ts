import { tryOnMount } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

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
    initialWidth = Infinity,
    initialHeight = Infinity,
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
  useEventListener('resize', update, { passive: true })

  if (listenOrientation) useEventListener('orientationchange', update, { passive: true })

  return { width, height }
}

export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>
