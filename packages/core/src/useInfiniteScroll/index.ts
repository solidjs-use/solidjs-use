import { toValue } from '@solidjs-use/shared'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createMemo, createSignal, on } from 'solid-js'
import { useScroll } from '../useScroll'
import type { UseScrollReturn, UseScrollOptions } from '../useScroll'
import type { MaybeAccessor, Awaitable } from '@solidjs-use/shared'

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
  direction?: 'top' | 'bottom' | 'left' | 'right'

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
  const { direction = 'bottom', interval = 100 } = options
  const state = useScroll(element, {
    ...options,
    offset: {
      [direction]: options.distance ?? 0,
      ...options.offset
    }
  })

  const [promise, setPromise] = createSignal<any>()
  const isLoading = createMemo(() => !!promise())

  function checkAndLoad() {
    const el = toValue(element) as HTMLElement
    if (!el) return

    const isNarrower =
      direction === 'bottom' || direction === 'top'
        ? el.scrollHeight <= el.clientHeight
        : el.scrollWidth <= el.clientWidth

    if (state.arrivedState[direction] || isNarrower) {
      if (!promise()) {
        setPromise(
          Promise.all([onLoadMore(state), new Promise(resolve => setTimeout(resolve, interval))]).finally(() => {
            setPromise(null)
            nextTick(() => checkAndLoad())
          })
        )
      }
    }
  }

  createEffect(on(() => [state.arrivedState[direction], toValue(element)], checkAndLoad))

  return {
    isLoading
  }
}
