import { noop, unAccessor, useDebounceFn, useThrottleFn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import { writableComputed } from '@solidjs-use/shared/solid-to-vue'
import { useEventListener } from '../useEventListener'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UseScrollOptions {
  /**
   * Throttle time for scroll event, it’s disabled by default.
   *
   * @default 0
   */
  throttle?: number

  /**
   * The check time when scrolling ends.
   * This configuration will be setting to (throttle + idle) when the `throttle` is configured.
   *
   * @default 200
   */
  idle?: number

  /**
   * Offset arrived states by x pixels
   *
   */
  offset?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }

  /**
   * Trigger it when scrolling.
   *
   */
  onScroll?: (e: Event) => void

  /**
   * Trigger it when scrolling ends.
   *
   */
  onStop?: (e: Event) => void

  /**
   * Listener options for scroll event.
   *
   * @default {capture: false, passive: true}
   */
  eventListenerOptions?: boolean | AddEventListenerOptions

  /**
   * Optionally specify a scroll behavior of `auto` (default, not smooth scrolling) or
   * `smooth` (for smooth scrolling) which takes effect when changing the `x` or `y` Signals.
   *
   * @default 'auto'
   */
  behavior?: MaybeAccessor<ScrollBehavior>
}

/**
 * We have to check if the scroll amount is close enough to some threshold in order to
 * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
 * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
const ARRIVED_STATE_THRESHOLD_PIXELS = 1

/**
 * Reactive scroll.
 */

export function useScroll(
  element: MaybeAccessor<HTMLElement | SVGElement | Window | Document | null | undefined>,
  options: UseScrollOptions = {}
) {
  const {
    throttle = 0,
    idle = 200,
    onStop = noop,
    onScroll = noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions = {
      capture: false,
      passive: true
    },
    behavior = 'auto'
  } = options

  const [internalX, setInternalX] = createSignal(0)
  const [internalY, setInternalY] = createSignal(0)

  // Use a computed for x and y because we want to write the value to the Signals
  // during a `scrollTo()` without firing additional `scrollTo()`s in the process.
  const [x, setX] = writableComputed({
    get() {
      return internalX()
    },
    set(x) {
      scrollTo(x, undefined)
    }
  })
  const [y, setY] = writableComputed({
    get() {
      return internalY()
    },
    set(y) {
      scrollTo(undefined, y)
    }
  })

  function scrollTo(_x: number | undefined, _y: number | undefined) {
    const _element = unAccessor(element)

    if (!_element) return
    ;(_element instanceof Document ? document.body : _element)?.scrollTo({
      top: unAccessor(_y) ?? y(),
      left: unAccessor(_x) ?? x(),
      behavior: unAccessor(behavior)
    })
  }

  const [isScrolling, setIsScrolling] = createSignal(false)
  const arrivedState = createMutable({
    left: true,
    right: false,
    top: true,
    bottom: false
  })
  const directions = createMutable({
    left: false,
    right: false,
    top: false,
    bottom: false
  })

  const onScrollEnd = (e: Event) => {
    if (!isScrolling()) return
    setIsScrolling(false)
    directions.left = false
    directions.right = false
    directions.top = false
    directions.bottom = false
    onStop(e)
  }
  const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle)

  const onScrollHandler = (e: Event) => {
    const eventTarget = (e.target === document ? (e.target as Document).documentElement : e.target) as HTMLElement

    const scrollLeft = eventTarget.scrollLeft
    directions.left = scrollLeft < internalX()
    directions.right = scrollLeft > internalY()
    arrivedState.left = scrollLeft <= 0 + (offset.left ?? 0)
    arrivedState.right =
      scrollLeft + eventTarget.clientWidth >=
      eventTarget.scrollWidth - (offset.right ?? 0) - ARRIVED_STATE_THRESHOLD_PIXELS
    setInternalX(scrollLeft)

    let scrollTop = eventTarget.scrollTop

    // patch for mobile compatible
    if (e.target === document && !scrollTop) scrollTop = document.body.scrollTop

    directions.top = scrollTop < internalY()
    directions.bottom = scrollTop > internalY()
    arrivedState.top = scrollTop <= 0 + (offset.top ?? 0)
    arrivedState.bottom =
      scrollTop + eventTarget.clientHeight >=
      eventTarget.scrollHeight - (offset.bottom ?? 0) - ARRIVED_STATE_THRESHOLD_PIXELS
    setInternalY(scrollTop)
    setIsScrolling(true)
    onScrollEndDebounced(e)
    onScroll(e)
  }

  useEventListener(
    element,
    'scroll',
    throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler,
    eventListenerOptions
  )

  useEventListener(element, 'scrollend', onScrollEnd, eventListenerOptions)

  return {
    x,
    setX,
    y,
    setY,
    isScrolling,
    arrivedState,
    directions
  }
}

export type UseScrollReturn = ReturnType<typeof useScroll>
