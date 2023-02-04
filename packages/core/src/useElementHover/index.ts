import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export function useElementHover(el: MaybeAccessor<EventTarget | null | undefined>): Accessor<boolean> {
  const [isHovered, setIsHovered] = createSignal(false)

  useEventListener(el, 'mouseenter', () => setIsHovered(true))
  useEventListener(el, 'mouseleave', () => setIsHovered(false))

  return isHovered
}
