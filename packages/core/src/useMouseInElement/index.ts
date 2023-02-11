import { watch } from '@solidjs-use/shared'
import { toAccessor } from '@solidjs-use/shared/solid-to-vue'
import { createSignal } from 'solid-js'
import { useMouse } from '../useMouse'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'

import type { MaybeElementAccessor } from '@solidjs-use/shared'
import type { UseMouseOptions } from '../useMouse'

export interface MouseInElementOptions extends UseMouseOptions {
  handleOutside?: boolean
}

/**
 * Reactive mouse position related to an element.
 */
export function useMouseInElement(target?: MaybeElementAccessor, options: MouseInElementOptions = {}) {
  const { handleOutside = true, window = defaultWindow } = options
  const { x, y, sourceType } = useMouse(options)

  const targetRef = toAccessor<HTMLElement | SVGElement>(target ?? window?.document.body)
  const [elementX, setElementX] = createSignal(0)
  const [elementY, setElementY] = createSignal(0)
  const [elementPositionX, setElementPositionX] = createSignal(0)
  const [elementPositionY, setElementPositionY] = createSignal(0)
  const [elementHeight, setElementHeight] = createSignal(0)
  const [elementWidth, setElementWidth] = createSignal(0)
  const [isOutside, setIsOutside] = createSignal(true)

  let stop = () => {}

  if (window) {
    stop = watch([targetRef, x, y], () => {
      const el = targetRef()
      if (!el) return

      const { left, top, width, height } = el.getBoundingClientRect()

      setElementPositionX(left + window.pageXOffset)
      setElementPositionY(top + window.pageYOffset)
      setElementHeight(height)
      setElementWidth(width)

      const elX = x() - elementPositionX()
      const elY = y() - elementPositionY()
      setIsOutside(width === 0 || height === 0 || elX <= 0 || elY <= 0 || elX > width || elY > height)

      if (handleOutside || !isOutside()) {
        setElementX(elX)
        setElementY(elY)
      }
    })

    useEventListener(document, 'mouseleave', () => {
      setIsOutside(true)
    })
  }

  return {
    x,
    y,
    sourceType,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isOutside,
    stop
  }
}

export type UseMouseInElementReturn = ReturnType<typeof useMouseInElement>
