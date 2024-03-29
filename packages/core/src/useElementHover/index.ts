import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'

import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { ConfigurableWindow } from '../_configurable'

export interface UseElementHoverOptions extends ConfigurableWindow {
  delayEnter?: number
  delayLeave?: number
}

/**
 * Reactive element's hover state.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useElementHover
 */
export function useElementHover(
  el: MaybeAccessor<EventTarget | null | undefined>,
  options: UseElementHoverOptions = {}
): Accessor<boolean> {
  const { delayEnter = 0, delayLeave = 0, window = defaultWindow } = options

  const [isHovered, setIsHovered] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const toggle = (entering: boolean) => {
    const delay = entering ? delayEnter : delayLeave
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    if (delay) timer = setTimeout(() => setIsHovered(entering), delay)
    else setIsHovered(entering)
  }

  if (!window) return isHovered

  useEventListener(el, 'mouseenter', () => toggle(true), { passive: true })
  useEventListener(el, 'mouseleave', () => toggle(false), { passive: true })

  return isHovered
}
