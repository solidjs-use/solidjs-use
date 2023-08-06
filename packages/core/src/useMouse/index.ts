import { createSignal } from "solid-js"
import { useEventListener } from "../useEventListener"
import { defaultWindow } from "../_configurable"
import type { ConfigurableEventFilter, MaybeAccessor } from "@solidjs-use/shared"
import type { Position } from "../types"
import type { ConfigurableWindow } from "../_configurable"

export type UseMouseCoordType = "page" | "client" | "screen" | "movement"
export type UseMouseSourceType = "mouse" | "touch" | null
export type UseMouseEventExtractor = (
  event: MouseEvent | Touch
) => [x: number, y: number] | null | undefined

export interface UseMouseOptions extends ConfigurableWindow, ConfigurableEventFilter {
  /**
   * Mouse position based by page, client, screen, or relative to previous position
   *
   * @default 'page'
   */
  type?: UseMouseCoordType | UseMouseEventExtractor

  /**
   * Listen events on `target` element
   *
   * @default 'Window'
   */
  target?: MaybeAccessor<Window | EventTarget | null | undefined>

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

const BuiltinExtractors: Record<UseMouseCoordType, UseMouseEventExtractor> = {
  page: event => [event.pageX, event.pageY],
  client: event => [event.clientX, event.clientY],
  screen: event => [event.screenX, event.screenY],
  movement: event => (event instanceof Touch ? null : [event.movementX, event.movementY])
} as const

/**
 * Reactive mouse position.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useMouse
 */
export function useMouse(options: UseMouseOptions = {}) {
  const {
    type = "page",
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window = defaultWindow,
    target = window,
    eventFilter
  } = options

  const [x, setX] = createSignal(initialValue.x)
  const [y, setY] = createSignal(initialValue.y)
  const [sourceType, setSourceType] = createSignal<UseMouseSourceType>(null)
  const extractor = typeof type === "function" ? type : BuiltinExtractors[type]

  const mouseHandler = (event: MouseEvent) => {
    const result = extractor(event)

    if (result) {
      const [x, y] = result
      setX(x)
      setY(y)
      setSourceType("mouse")
    }
  }

  const touchHandler = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const result = extractor(event.touches[0])
      if (result) {
        const [x, y] = result
        setX(x)
        setY(y)
        setSourceType("touch")
      }
    }
  }

  const reset = () => {
    setX(initialValue.x)
    setY(initialValue.y)
  }

  const mouseHandlerWrapper = eventFilter
    ? (event: MouseEvent) => eventFilter(() => mouseHandler(event), {} as any)
    : (event: MouseEvent) => mouseHandler(event)

  const touchHandlerWrapper = eventFilter
    ? (event: TouchEvent) => eventFilter(() => touchHandler(event), {} as any)
    : (event: TouchEvent) => touchHandler(event)

  if (target) {
    const listenerOptions = { passive: true }
    useEventListener(target, ["mousemove", "dragover"], mouseHandlerWrapper, listenerOptions)
    if (touch && type !== "movement") {
      useEventListener(target, ["touchstart", "touchmove"], touchHandlerWrapper, listenerOptions)
      if (resetOnTouchEnds) useEventListener(target, "touchend", reset, listenerOptions)
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
