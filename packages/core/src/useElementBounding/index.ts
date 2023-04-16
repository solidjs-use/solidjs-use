import { toAccessor, tryOnMount, toValue } from '@solidjs-use/shared'
import { createEffect, createSignal, on } from 'solid-js'
import { useEventListener } from '../useEventListener'
import { useResizeObserver } from '../useResizeObserver'
import type { MaybeElementAccessor } from '@solidjs-use/shared'

export interface UseElementBoundingOptions {
  /**
   * Reset values to 0 on component unmounted
   *
   * @default true
   */
  reset?: boolean

  /**
   * Listen to window resize event
   *
   * @default true
   */
  windowResize?: boolean
  /**
   * Listen to window scroll event
   *
   * @default true
   */
  windowScroll?: boolean

  /**
   * Immediately call update on component mounted
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * Reactive bounding box of an HTML element.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useElementBounding
 */
export function useElementBounding(target: MaybeElementAccessor, options: UseElementBoundingOptions = {}) {
  const { reset = true, windowResize = true, windowScroll = true, immediate = true } = options

  const [height, setHeight] = createSignal(0)
  const [bottom, setBottom] = createSignal(0)
  const [left, setLeft] = createSignal(0)
  const [right, setRight] = createSignal(0)
  const [top, setTop] = createSignal(0)
  const [width, setWidth] = createSignal(0)
  const [x, setX] = createSignal(0)
  const [y, setY] = createSignal(0)

  function update() {
    const el = toValue(target)

    if (!el) {
      if (reset) {
        setHeight(0)
        setBottom(0)
        setLeft(0)
        setRight(0)
        setTop(0)
        setWidth(0)
        setX(0)
        setY(0)
      }
      return
    }

    const rect = el.getBoundingClientRect()
    setHeight(rect.height)
    setBottom(rect.bottom)
    setLeft(rect.left)
    setRight(rect.right)
    setTop(rect.top)
    setWidth(rect.width)
    setX(rect.x)
    setY(rect.y)
  }

  useResizeObserver(target, update)
  createEffect(
    on(
      toAccessor(target),
      ele => {
        !ele && update()
      },
      { defer: true }
    )
  )

  if (windowScroll) useEventListener('scroll', update, { capture: true, passive: true })
  if (windowResize) useEventListener('resize', update, { passive: true })

  tryOnMount(() => {
    if (immediate) update()
  })

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  }
}

export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>
