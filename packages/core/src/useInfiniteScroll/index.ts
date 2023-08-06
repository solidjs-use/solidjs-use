import { toValue } from "@solidjs-use/shared"
import { nextTick } from "@solidjs-use/shared/solid-to-vue"
import { createEffect, createMemo, createSignal, on } from "solid-js"
import { useScroll } from "../useScroll"
import type { UseScrollReturn, UseScrollOptions } from "../useScroll"
import type { MaybeAccessor, Awaitable } from "@solidjs-use/shared"
import { useElementVisibility } from "../useElementVisibility"

export interface UseInfiniteScrollOptions extends UseScrollOptions {
  /**
   * The minimum distance between the bottom of the element and the bottom of the viewport
   *
   * @default 0
   */
  distance?: number

  /**
   * The direction in which to listen the scroll.
   *
   * @default 'bottom'
   */
  direction?: "top" | "bottom" | "left" | "right"

  /**
   * The interval time between two load more (to avoid too many invokes).
   *
   * @default 100
   */
  interval?: number
}

/**
 * Reactive infinite scroll.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useInfiniteScroll
 */
export function useInfiniteScroll(
  element: MaybeAccessor<HTMLElement | SVGElement | Window | Document | null | undefined>,
  onLoadMore: (state: UseScrollReturn) => Awaitable<void>,
  options: UseInfiniteScrollOptions = {}
) {
  const { direction = "bottom", interval = 100 } = options
  const state = useScroll(element, {
    ...options,
    offset: {
      [direction]: options.distance ?? 0,
      ...options.offset
    }
  })

  const [promise, setPromise] = createSignal<any>()
  const isLoading = createMemo(() => !!promise())
  // Document and Window cannot be observed by IntersectionObserver
  const observedElement = createMemo<HTMLElement | SVGElement | null | undefined>(() => {
    const el = toValue(element)
    if (el instanceof Window) return window.document.documentElement

    if (el instanceof Document) return document.documentElement

    return el
  })
  const isElementVisible = useElementVisibility(observedElement)

  function checkAndLoad() {
    state.measure()
    if (!observedElement() || !isElementVisible()) return
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
      observedElement() as HTMLElement

    const isNarrower =
      direction === "bottom" || direction === "top"
        ? scrollHeight <= clientHeight
        : scrollWidth <= clientWidth

    if (state.arrivedState[direction] || isNarrower) {
      if (!promise()) {
        setPromise(
          Promise.all([
            onLoadMore(state),
            new Promise(resolve => setTimeout(resolve, interval))
          ]).finally(() => {
            setPromise(null)
            nextTick(() => checkAndLoad())
          })
        )
      }
    }
  }

  createEffect(on(() => [state.arrivedState[direction], isElementVisible()], checkAndLoad))

  return {
    isLoading
  }
}
