import { resolveAccessor } from '@solidjs-use/shared'
import { useEventListener } from '../useEventListener'
import type { MaybeElementAccessor } from '@solidjs-use/shared'

const DEFAULT_DELAY = 500

export interface OnLongPressOptions {
  /**
   * Time in ms till `longpress` gets called
   *
   * @default 500
   */
  delay?: number

  modifiers?: OnLongPressModifiers
}

export interface OnLongPressModifiers {
  stop?: boolean
  once?: boolean
  prevent?: boolean
  capture?: boolean
  self?: boolean
}

/**
 * Listen for a long press on an element.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/onLongPress
 */
export function onLongPress(
  target: MaybeElementAccessor,
  handler: (evt: PointerEvent) => void,
  options?: OnLongPressOptions
) {
  const elementRef = resolveAccessor(target)

  let timeout: ReturnType<typeof setTimeout> | undefined

  function clear() {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
  }

  function onDown(ev: PointerEvent) {
    if (options?.modifiers?.self && ev.target !== elementRef()) return

    clear()

    if (options?.modifiers?.prevent) ev.preventDefault()

    if (options?.modifiers?.stop) ev.stopPropagation()

    timeout = setTimeout(() => handler(ev), options?.delay ?? DEFAULT_DELAY)
  }

  const listenerOptions: AddEventListenerOptions = {
    capture: options?.modifiers?.capture,
    once: options?.modifiers?.once
  }

  useEventListener(elementRef, 'pointerdown', onDown, listenerOptions)
  useEventListener(elementRef, 'pointerup', clear, listenerOptions)
  useEventListener(elementRef, 'pointerleave', clear, listenerOptions)
}
