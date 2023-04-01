import { resolveAccessor, watch } from '@solidjs-use/shared'
import { createMemo, createSignal } from 'solid-js'
import { toSignal } from '@solidjs-use/shared/solid-to-vue'
import { useElementSize } from '../useElementSize'
import type { StyleValue } from '@solidjs-use/shared/solid-to-vue'
import type { Accessor, Setter } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

type UseVirtualListItemSize = number | ((index: number) => number)

export interface UseHorizontalVirtualListOptions extends UseVirtualListOptionsBase {
  /**
   * item width, accept a pixel value or a function that returns the height
   *
   * @default 0
   */
  itemWidth: UseVirtualListItemSize
}

export interface UseVerticalVirtualListOptions extends UseVirtualListOptionsBase {
  /**
   * item height, accept a pixel value or a function that returns the height
   *
   * @default 0
   */
  itemHeight: UseVirtualListItemSize
}

export interface UseVirtualListOptionsBase {
  /**
   * the extra buffer items outside of the view area
   *
   * @default 5
   */
  overscan?: number
}

export type UseVirtualListOptions = UseHorizontalVirtualListOptions | UseVerticalVirtualListOptions

export interface UseVirtualListItem<T> {
  data: T
  index: number
}

export interface UseVirtualListReturn<T> {
  list: Accessor<Array<UseVirtualListItem<T>>>
  scrollTo: (index: number) => void

  containerProps: {
    ref: (el: HTMLElement | null) => void
    onScroll: () => void
    style: StyleValue
  }
  wrapperProps: Accessor<{
    style:
      | {
          width: string
          height: string
          'margin-top': string
        }
      | {
          width: string
          height: string
          'margin-left': string
          display: string
        }
  }>
}

/**
 * Create virtual lists with ease.
 *
 * @see https://solidjs-use.github.io/solidjs-use/core/useVirtualList
 */
export function useVirtualList<T = any>(
  list: MaybeAccessor<T[]>,
  options: UseVirtualListOptions
): UseVirtualListReturn<T> {
  const { containerStyle, wrapperProps, scrollTo, calculateRange, currentList, setContainerRef } =
    'itemHeight' in options ? useVerticalVirtualList(options, list) : useHorizontalVirtualList(options, list)

  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: (el: HTMLElement | null) => setContainerRef(el),
      onScroll: () => {
        calculateRange()
      },
      style: containerStyle
    },
    wrapperProps
  }
}

interface UseVirtualElementSizes {
  width: Accessor<number>
  height: Accessor<number>
}

interface UseVirtualListState {
  start: number
  end: number
}

interface UseVirtualListResources<T> {
  state: Accessor<UseVirtualListState>
  setState: Setter<UseVirtualListState>
  source: Accessor<T[]>
  setSource: Setter<T[]>
  currentList: Accessor<Array<UseVirtualListItem<T>>>
  setCurrentList: Setter<Array<UseVirtualListItem<T>>>
  size: UseVirtualElementSizes
  containerRef: Accessor<HTMLElement | null>
  setContainerRef: Setter<HTMLElement | null>
}

function useVirtualListResourses<T>(list: MaybeAccessor<T[]>): UseVirtualListResources<T> {
  const [containerRef, setContainerRef] = createSignal<HTMLElement | null>(null)
  const size = useElementSize(containerRef)

  const [currentList, setCurrentList] = createSignal<Array<UseVirtualListItem<T>>>([])
  const [source, setSource] = toSignal(list)

  const [state, setState] = createSignal<{ start: number; end: number }>({ start: 0, end: 10 })

  return { state, setState, currentList, setCurrentList, source, setSource, setContainerRef, containerRef, size }
}

function createGetViewCapacity<T>(
  state: UseVirtualListResources<T>['state'],
  source: UseVirtualListResources<T>['source'],
  itemSize: UseVirtualListItemSize
) {
  return (containerSize: number) => {
    if (typeof itemSize === 'number') return Math.ceil(containerSize / itemSize)

    const { start = 0 } = state()
    let sum = 0
    let capacity = 0
    for (let i = start; i < source().length; i++) {
      const size = itemSize(i)
      sum += size
      capacity = i
      if (sum > containerSize) {
        capacity = i
        break
      }
    }
    return capacity - start
  }
}

function createGetOffset<T>(source: UseVirtualListResources<T>['source'], itemSize: UseVirtualListItemSize) {
  return (scrollDirection: number) => {
    if (typeof itemSize === 'number') return Math.floor(scrollDirection / itemSize) + 1

    let sum = 0
    let offset = 0

    for (let i = 0; i < source().length; i++) {
      const size = itemSize(i)
      sum += size
      if (sum >= scrollDirection) {
        offset = i
        break
      }
    }
    return offset + 1
  }
}

function createCalculateRange<T>(
  type: 'horizontal' | 'vertical',
  overscan: number,
  getOffset: ReturnType<typeof createGetOffset>,
  getViewCapacity: ReturnType<typeof createGetViewCapacity>,
  { containerRef, state, setState, source, setCurrentList }: UseVirtualListResources<T>
) {
  return () => {
    const element = containerRef()
    if (element) {
      const offset = getOffset(type === 'vertical' ? element.scrollTop : element.scrollLeft)
      const viewCapacity = getViewCapacity(type === 'vertical' ? element.clientHeight : element.clientWidth)

      const from = offset - overscan
      const to = offset + viewCapacity + overscan
      setState({
        start: from < 0 ? 0 : from,
        end: to > source().length ? source().length : to
      })
      setCurrentList(
        source()
          .slice(state().start, state().end)
          .map((ele, index) => ({
            data: ele,
            index: index + state().start
          }))
      )
    }
  }
}

function createGetDistance<T>(itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']) {
  return (index: number) => {
    if (typeof itemSize === 'number') {
      const size = index * itemSize
      return size
    }

    const size = source()
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemSize(i), 0)

    return size
  }
}

function useWatchForSizes<T>(size: UseVirtualElementSizes, list: MaybeAccessor<T[]>, calculateRange: () => void) {
  watch(
    [size.width, size.height, resolveAccessor(list)],
    () => {
      calculateRange()
    },
    { defer: true }
  )
}

function createComputedTotalSize<T>(itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']) {
  return createMemo(() => {
    if (typeof itemSize === 'number') return source().length * itemSize

    return source().reduce((sum, _, index) => sum + itemSize(index), 0)
  })
}

const scrollToDictionaryForElementScrollKey = {
  horizontal: 'scrollLeft',
  vertical: 'scrollTop'
} as const

function createScrollTo<T>(
  type: 'horizontal' | 'vertical',
  calculateRange: () => void,
  getDistance: ReturnType<typeof createGetDistance>,
  containerRef: UseVirtualListResources<T>['containerRef']
) {
  return (index: number) => {
    const el = containerRef()
    if (el) {
      el[scrollToDictionaryForElementScrollKey[type]] = getDistance(index)
      calculateRange()
    }
  }
}

function useHorizontalVirtualList<T>(options: UseHorizontalVirtualListOptions, list: MaybeAccessor<T[]>) {
  const resources = useVirtualListResourses(list)
  const { state, source, currentList, size, containerRef, setContainerRef } = resources
  const containerStyle: StyleValue = { 'overflow-x': 'auto' }

  const { itemWidth, overscan = 5 } = options

  const getViewCapacity = createGetViewCapacity(state, source, itemWidth)

  const getOffset = createGetOffset(source, itemWidth)

  const calculateRange = createCalculateRange('horizontal', overscan, getOffset, getViewCapacity, resources)

  const getDistanceLeft = createGetDistance(itemWidth, source)

  const offsetLeft = createMemo(() => getDistanceLeft(state().start))

  const totalWidth = createComputedTotalSize(itemWidth, source)

  useWatchForSizes(size, list, calculateRange)

  const scrollTo = createScrollTo('horizontal', calculateRange, getDistanceLeft, containerRef)

  const wrapperProps = createMemo(() => {
    return {
      style: {
        height: '100%',
        width: `${totalWidth() - offsetLeft()}px`,
        'margin-left': `${offsetLeft()}px`,
        display: 'flex'
      }
    }
  })

  return {
    scrollTo,
    calculateRange,
    wrapperProps,
    containerStyle,
    setContainerRef,
    currentList,
    containerRef
  }
}

function useVerticalVirtualList<T>(options: UseVerticalVirtualListOptions, list: MaybeAccessor<T[]>) {
  const resources = useVirtualListResourses(list)

  const { state, source, currentList, size, containerRef, setContainerRef } = resources

  const containerStyle: StyleValue = { 'overflow-y': 'auto' }

  const { itemHeight, overscan = 5 } = options

  const getViewCapacity = createGetViewCapacity(state, source, itemHeight)

  const getOffset = createGetOffset(source, itemHeight)

  const calculateRange = createCalculateRange('vertical', overscan, getOffset, getViewCapacity, resources)

  const getDistanceTop = createGetDistance(itemHeight, source)

  const offsetTop = createMemo(() => getDistanceTop(state().start))

  const totalHeight = createComputedTotalSize(itemHeight, source)

  useWatchForSizes(size, list, calculateRange)

  const scrollTo = createScrollTo('vertical', calculateRange, getDistanceTop, containerRef)

  const wrapperProps = createMemo(() => {
    return {
      style: {
        width: '100%',
        height: `${totalHeight() - offsetTop()}px`,
        'margin-top': `${offsetTop()}px`
      }
    }
  })

  return {
    calculateRange,
    scrollTo,
    containerStyle,
    wrapperProps,
    currentList,
    containerRef,
    setContainerRef
  }
}
