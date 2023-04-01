import { isClient, unAccessor } from '@solidjs-use/shared'
import { createMemo } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import type { MaybeAccessor } from '@solidjs-use/shared'
import type { PointerType, Position } from '../types'

export interface UseDraggableOptions {
  /**
   * Only start the dragging when click on the element directly
   *
   * @default false
   */
  exact?: MaybeAccessor<boolean>

  /**
   * Prevent events defaults
   *
   * @default false
   */
  preventDefault?: MaybeAccessor<boolean>

  /**
   * Prevent events propagation
   *
   * @default false
   */
  stopPropagation?: MaybeAccessor<boolean>

  /**
   * Element to attach `pointermove` and `pointerup` events to.
   *
   * @default window
   */
  draggingElement?: MaybeAccessor<HTMLElement | SVGElement | Window | Document | null | undefined>

  /**
   * Handle that triggers the drag event
   *
   * @default target
   */
  handle?: MaybeAccessor<HTMLElement | SVGElement | null | undefined>

  /**
   * Pointer types that listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[]

  /**
   * Initial position of the element.
   *
   * @default { x: 0, y: 0 }
   */
  initialValue?: MaybeAccessor<Position>

  /**
   * Callback when the dragging starts. Return `false` to prevent dragging.
   */
  onStart?: (position: Position, event: PointerEvent) => void | false

  /**
   * Callback during dragging.
   */
  onMove?: (position: Position, event: PointerEvent) => void

  /**
   * Callback when dragging end.
   */
  onEnd?: (position: Position, event: PointerEvent) => void
}

/**
 * Make elements draggable.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useDraggable
 */
export function useDraggable(
  target: MaybeAccessor<HTMLElement | SVGElement | null | undefined>,
  options: UseDraggableOptions = {}
) {
  const draggingElement = options.draggingElement ?? defaultWindow
  const draggingHandle = options.handle ?? target
  const position = createMutable<{ value: Position }>({ value: unAccessor(options.initialValue) ?? { x: 0, y: 0 } })
  const pressedDelta = createMutable<{ value: Position | undefined }>({ value: undefined })

  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) return options.pointerTypes.includes(e.pointerType as PointerType)
    return true
  }

  const handleEvent = (e: PointerEvent) => {
    if (unAccessor(options.preventDefault)) e.preventDefault()
    if (unAccessor(options.stopPropagation)) e.stopPropagation()
  }

  const start = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (unAccessor(options.exact) && e.target !== unAccessor(target)) return
    const rect = unAccessor(target)!.getBoundingClientRect()
    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    if (options.onStart?.(pos, e) === false) return
    pressedDelta.value = pos
    handleEvent(e)
  }
  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    position.value = {
      x: e.clientX - pressedDelta.value.x,
      y: e.clientY - pressedDelta.value.y
    }
    options.onMove?.(position.value, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    pressedDelta.value = undefined
    options.onEnd?.(position.value, e)
    handleEvent(e)
  }

  if (isClient) {
    useEventListener(draggingHandle, 'pointerdown', start, true)
    useEventListener(draggingElement, 'pointermove', move, true)
    useEventListener(draggingElement, 'pointerup', end, true)
  }

  return {
    x: () => position.value.x,
    y: () => position.value.x,
    position,
    isDragging: createMemo(() => !!pressedDelta.value),
    style: createMemo(() => ({ left: `${position.value.x}px`, top: `${position.value.y}px` }))
  }
}

export type UseDraggableReturn = ReturnType<typeof useDraggable>
