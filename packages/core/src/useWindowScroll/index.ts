import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive window scroll.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useWindowScroll
 */
export function useWindowScroll({ window = defaultWindow }: ConfigurableWindow = {}) {
  if (!window) {
    const [x] = createSignal(0)
    const [y] = createSignal(0)
    return {
      x,
      y
    }
  }

  const [x, setX] = createSignal(window.scrollX)
  const [y, setY] = createSignal(window.scrollY)

  useEventListener(
    window,
    'scroll',
    () => {
      setX(window.scrollX)
      setY(window.scrollY)
    },
    {
      capture: false,
      passive: true
    }
  )

  return { x, y }
}

export type UseWindowScrollReturn = ReturnType<typeof useWindowScroll>
