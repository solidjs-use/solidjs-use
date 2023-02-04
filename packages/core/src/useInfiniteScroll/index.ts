import { unAccessor } from '@solidjs-use/shared'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, on } from 'solid-js'
import { useScroll } from '../useScroll'
import type { UseScrollReturn, UseScrollOptions } from '../useScroll'
import type { MaybeAccessor } from '@solidjs-use/shared'

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
   * Whether to preserve the current scroll position when loading more items.
   *
   * @default false
   */
  preserveScrollPosition?: boolean
}

/**
 * Reactive infinite scroll.
 */
export function useInfiniteScroll(
  element: MaybeAccessor<HTMLElement | SVGElement | Window | Document | null | undefined>,
  onLoadMore: (state: UseScrollReturn) => void | Promise<void>,
  options: UseInfiniteScrollOptions = {}
) {
  const direction = options.direction ?? 'bottom'
  const state = useScroll(element, {
    ...options,
    offset: {
      [direction]: options.distance ?? 0,
      ...options.offset
    }
  })

  createEffect(
    on(
      () => state.arrivedState[direction],
      async v => {
        if (v) {
          const elem = unAccessor(element) as Element
          const previous = {
            height: elem?.scrollHeight ?? 0,
            width: elem?.scrollWidth ?? 0
          }

          await onLoadMore(state)

          if (options.preserveScrollPosition && elem) {
            nextTick(() => {
              elem.scrollTo({
                top: elem.scrollHeight - previous.height,
                left: elem.scrollWidth - previous.width
              })
            })
          }
        }
      }
    )
  )
}
