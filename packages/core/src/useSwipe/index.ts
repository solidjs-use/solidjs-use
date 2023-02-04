import { noop } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { Position } from '../types'
import type { ConfigurableWindow } from '../_configurable'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export enum SwipeDirection {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  NONE = 'NONE'
}

export interface UseSwipeOptions extends ConfigurableWindow {
  /**
   * Register events as passive
   *
   * @default true
   */
  passive?: boolean

  /**
   * @default 50
   */
  threshold?: number

  /**
   * Callback on swipe start
   */
  onSwipeStart?: (e: TouchEvent) => void

  /**
   * Callback on swipe moves
   */
  onSwipe?: (e: TouchEvent) => void

  /**
   * Callback on swipe ends
   */
  onSwipeEnd?: (e: TouchEvent, direction: SwipeDirection) => void
}

export interface UseSwipeReturn {
  isPassiveEventSupported: boolean
  isSwiping: Accessor<boolean>
  direction: Accessor<SwipeDirection | null>
  coordsStart: Readonly<Position>
  coordsEnd: Readonly<Position>
  lengthX: Accessor<number>
  lengthY: Accessor<number>
  stop: () => void
}

/**
 * Reactive swipe detection.
 */
export function useSwipe(
  target: MaybeAccessor<EventTarget | null | undefined>,
  options: UseSwipeOptions = {}
): UseSwipeReturn {
  const { threshold = 50, onSwipe, onSwipeEnd, onSwipeStart, passive = true, window = defaultWindow } = options

  const coordsStart = createMutable<Position>({ x: 0, y: 0 })
  const coordsEnd = createMutable<Position>({ x: 0, y: 0 })

  const diffX = createMemo(() => coordsStart.x - coordsEnd.x)
  const diffY = createMemo(() => coordsStart.y - coordsEnd.y)

  const { max, abs } = Math
  const isThresholdExceeded = createMemo(() => max(abs(diffX()), abs(diffY())) >= threshold)

  const [isSwiping, setIsSwiping] = createSignal(false)

  const direction = createMemo(() => {
    if (!isThresholdExceeded()) return SwipeDirection.NONE

    if (abs(diffX()) > abs(diffY())) {
      return diffX() > 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT
    }
    return diffY() > 0 ? SwipeDirection.UP : SwipeDirection.DOWN
  })

  const getTouchEventCoords = (e: TouchEvent) => [e.touches[0].clientX, e.touches[0].clientY]

  const updateCoordsStart = (x: number, y: number) => {
    coordsStart.x = x
    coordsStart.y = y
  }

  const updateCoordsEnd = (x: number, y: number) => {
    coordsEnd.x = x
    coordsEnd.y = y
  }

  let listenerOptions: { passive?: boolean; capture?: boolean }

  const isPassiveEventSupported = checkPassiveEventSupport(window?.document)

  if (!passive) listenerOptions = isPassiveEventSupported ? { passive: false, capture: true } : { capture: true }
  else listenerOptions = isPassiveEventSupported ? { passive: true } : { capture: false }

  const onTouchEnd = (e: TouchEvent) => {
    if (isSwiping()) onSwipeEnd?.(e, direction())

    setIsSwiping(false)
  }

  const stops = [
    useEventListener(
      target,
      'touchstart',
      (e: TouchEvent) => {
        if (listenerOptions.capture && !listenerOptions.passive) e.preventDefault()
        const [x, y] = getTouchEventCoords(e)
        updateCoordsStart(x, y)
        updateCoordsEnd(x, y)
        onSwipeStart?.(e)
      },
      listenerOptions
    ),

    useEventListener(
      target,
      'touchmove',
      (e: TouchEvent) => {
        const [x, y] = getTouchEventCoords(e)
        updateCoordsEnd(x, y)
        if (!isSwiping() && isThresholdExceeded()) setIsSwiping(true)
        if (isSwiping()) onSwipe?.(e)
      },
      listenerOptions
    ),

    useEventListener(target, 'touchend', onTouchEnd, listenerOptions),
    useEventListener(target, 'touchcancel', onTouchEnd, listenerOptions)
  ]

  const stop = () => stops.forEach(s => s())

  return {
    isPassiveEventSupported,
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop
  }
}

/**
 * This is a polyfill for passive event support detection
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */
function checkPassiveEventSupport(document?: Document) {
  if (!document) return false
  let supportsPassive = false
  const optionsBlock: AddEventListenerOptions = {
    get passive() {
      supportsPassive = true
      return false
    }
  }
  document.addEventListener('x', noop, optionsBlock)
  document.removeEventListener('x', noop)
  return supportsPassive
}
