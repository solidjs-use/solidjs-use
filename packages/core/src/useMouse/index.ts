import { createSignal } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { ConfigurableEventFilter } from '@solidjs-use/shared'
import type { Position } from '../types'
import type { ConfigurableWindow } from '../_configurable'

export interface UseMouseOptions extends ConfigurableWindow, ConfigurableEventFilter {
  /**
   * Mouse position based by page, client, or relative to previous position
   *
   * @default 'page'
   */
  type?: 'page' | 'client' | 'movement'

  /**
   * Listen to `touchmove` events
   *
   * @default true
   */
  touch?: boolean

  /**
   * Reset to initial value when `touchend` event fired
   *
   * @default false
   */
  resetOnTouchEnds?: boolean

  /**
   * Initial values
   */
  initialValue?: Position
}

export type MouseSourceType = 'mouse' | 'touch' | null

/**
 * Reactive mouse position.
 */
export function useMouse(options: UseMouseOptions = {}) {
  const {
    type = 'page',
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window = defaultWindow,
    eventFilter
  } = options

  const [x, setX] = createSignal(initialValue.x)
  const [y, setY] = createSignal(initialValue.y)
  const [sourceType, setSourceType] = createSignal<MouseSourceType>(null)

  const mouseHandler = (event: MouseEvent) => {
    if (type === 'page') {
      setX(event.pageX)
      setY(event.pageY)
    } else if (type === 'client') {
      setX(event.clientX)
      setY(event.clientY)
    } else if (type === 'movement') {
      setX(event.movementX)
      setY(event.movementY)
    }
    setSourceType('mouse')
  }
  const reset = () => {
    setX(initialValue.x)
    setY(initialValue.y)
  }
  const touchHandler = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0]
      if (type === 'page') {
        setX(touch.pageX)
        setY(touch.pageY)
      } else if (type === 'client') {
        setX(touch.clientX)
        setY(touch.clientY)
      }
      setSourceType('touch')
    }
  }

  const mouseHandlerWrapper = (event: MouseEvent) => {
    return eventFilter === undefined ? mouseHandler(event) : eventFilter(() => mouseHandler(event), {} as any)
  }

  const touchHandlerWrapper = (event: TouchEvent) => {
    return eventFilter === undefined ? touchHandler(event) : eventFilter(() => touchHandler(event), {} as any)
  }

  if (window) {
    useEventListener(window, 'mousemove', mouseHandlerWrapper, { passive: true })
    useEventListener(window, 'dragover', mouseHandlerWrapper, { passive: true })
    if (touch && type !== 'movement') {
      useEventListener(window, 'touchstart', touchHandlerWrapper, { passive: true })
      useEventListener(window, 'touchmove', touchHandlerWrapper, { passive: true })
      if (resetOnTouchEnds) useEventListener(window, 'touchend', reset, { passive: true })
    }
  }

  return {
    x,
    y,
    setX,
    setY,
    sourceType
  }
}

export type UseMouseReturn = ReturnType<typeof useMouse>
