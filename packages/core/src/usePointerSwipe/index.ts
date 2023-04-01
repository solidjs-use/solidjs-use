import { resolveAccessor } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useEventListener } from '../useEventListener'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { PointerType, Position } from '../types'
import type { UseSwipeDirection } from '../useSwipe'

export interface UsePointerSwipeOptions {
  /**
   * @default 50
   */
  threshold?: number

  /**
   * Callback on swipe start.
   */
  onSwipeStart?: (e: PointerEvent) => void

  /**
   * Callback on swipe move.
   */
  onSwipe?: (e: PointerEvent) => void

  /**
   * Callback on swipe end.
   */
  onSwipeEnd?: (e: PointerEvent, direction: UseSwipeDirection) => void

  /**
   * Pointer types to listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[]
}

export interface UsePointerSwipeReturn {
  isSwiping: Accessor<boolean>
  direction: Accessor<UseSwipeDirection>
  readonly posStart: Position
  readonly posEnd: Position
  distanceX: Accessor<number>
  distanceY: Accessor<number>
  stop: () => void
}

/**
 * Reactive swipe detection based on PointerEvents.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/usePointerSwipe
 */
export function usePointerSwipe(
  target: MaybeAccessor<HTMLElement | null | undefined>,
  options: UsePointerSwipeOptions = {}
): UsePointerSwipeReturn {
  const targetRef = resolveAccessor(target)
  const { threshold = 50, onSwipe, onSwipeEnd, onSwipeStart } = options

  const posStart = createMutable<Position>({ x: 0, y: 0 })
  const updatePosStart = (x: number, y: number) => {
    posStart.x = x
    posStart.y = y
  }

  const posEnd = createMutable<Position>({ x: 0, y: 0 })
  const updatePosEnd = (x: number, y: number) => {
    posEnd.x = x
    posEnd.y = y
  }

  const distanceX = createMemo(() => posStart.x - posEnd.x)
  const distanceY = createMemo(() => posStart.y - posEnd.y)

  const { max, abs } = Math
  const isThresholdExceeded = createMemo(() => max(abs(distanceX()), abs(distanceY())) >= threshold)
  const [isSwiping, setIsSwiping] = createSignal(false)
  const [isPointerDown, setIsPointerDown] = createSignal(false)

  const direction = createMemo(() => {
    if (!isThresholdExceeded()) return 'none'

    if (abs(distanceX()) > abs(distanceY())) {
      return distanceX() > 0 ? 'left' : 'right'
    }
    return distanceY() > 0 ? 'up' : 'down'
  })

  const eventIsAllowed = (e: PointerEvent): boolean => {
    const isReleasingButton = e.buttons === 0
    const isPrimaryButton = e.buttons === 1
    return (
      options.pointerTypes?.includes(e.pointerType as PointerType) ?? (isReleasingButton || isPrimaryButton) ?? true
    )
  }

  const stops = [
    useEventListener(target, 'pointerdown', (e: PointerEvent) => {
      if (!eventIsAllowed(e)) return
      setIsPointerDown(true)
      // Disable scroll on for TouchEvents
      targetRef()?.style?.setProperty('touch-action', 'none')
      // Future pointer events will be retargeted to target until pointerup/cancel
      const eventTarget = e.target as HTMLElement | undefined
      eventTarget?.setPointerCapture(e.pointerId)
      const { clientX: x, clientY: y } = e
      updatePosStart(x, y)
      updatePosEnd(x, y)
      onSwipeStart?.(e)
    }),

    useEventListener(target, 'pointermove', (e: PointerEvent) => {
      if (!eventIsAllowed(e)) return
      if (!isPointerDown()) return

      const { clientX: x, clientY: y } = e
      updatePosEnd(x, y)
      if (!isSwiping() && isThresholdExceeded()) setIsSwiping(true)
      if (isSwiping()) onSwipe?.(e)
    }),

    useEventListener(target, 'pointerup', (e: PointerEvent) => {
      if (!eventIsAllowed(e)) return
      if (isSwiping()) onSwipeEnd?.(e, direction())

      setIsPointerDown(false)
      setIsSwiping(false)
      targetRef()?.style?.setProperty('touch-action', 'initial')
    })
  ]

  const stop = () => stops.forEach(s => s())

  return {
    isSwiping,
    direction,
    posStart,
    posEnd,
    distanceX,
    distanceY,
    stop
  }
}
