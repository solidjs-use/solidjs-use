import { isNumber, noop, syncSignal, unAccessor } from '@solidjs-use/shared'
import { isAccessor, reactive } from '@solidjs-use/shared/solid-to-vue'
import { createEffect, createMemo, on } from 'solid-js'
import { useClamp } from '../../../math/src/useClamp'
import type { Accessor, Setter } from 'solid-js'
import type { MaybeAccessor } from '@solidjs-use/shared'

export interface UseOffsetPaginationOptions {
  /**
   * Total number of items.
   */
  total?: MaybeAccessor<number>

  /**
   * The number of items to display per page.
   * @default 10
   */
  pageSize?: MaybeAccessor<number>

  /**
   * Set per page.
   */
  setPageSize?: Setter<number>

  /**
   * The current page number.
   * @default 1
   */
  page?: MaybeAccessor<number>

  /**
   * Set current page.
   */
  setPage?: Setter<number>

  /**
   * Callback when the `page` change.
   */
  onPageChange?: (returnValue: UseOffsetPaginationReturn) => unknown

  /**
   * Callback when the `pageSize` change.
   */
  onPageSizeChange?: (returnValue: UseOffsetPaginationReturn) => unknown

  /**
   * Callback when the `pageCount` change.
   */
  onPageCountChange?: (returnValue: UseOffsetPaginationReturn) => unknown
}

export interface UseOffsetPaginationReturn {
  currentPage: Accessor<number>
  setCurrentPage: Setter<number>
  currentPageSize: Accessor<number>
  setCurrentPageSize: Setter<number>
  pageCount: Accessor<number>
  isFirstPage: Accessor<boolean>
  isLastPage: Accessor<boolean>
  prev: () => void
  next: () => void
}

export type UseOffsetPaginationInfinityPageReturn = Omit<UseOffsetPaginationReturn, 'isLastPage'>

export function useOffsetPagination(
  options: Omit<UseOffsetPaginationOptions, 'total'>
): UseOffsetPaginationInfinityPageReturn
export function useOffsetPagination(options: UseOffsetPaginationOptions): UseOffsetPaginationReturn
export function useOffsetPagination(options: UseOffsetPaginationOptions): UseOffsetPaginationReturn {
  const {
    total = Infinity,
    pageSize = 10,
    page = 1,
    setPage,
    setPageSize,
    onPageChange = noop,
    onPageSizeChange = noop,
    onPageCountChange = noop
  } = options

  const [currentPageSize, setCurrentPageSize] = useClamp(
    setPageSize === undefined || isNumber(pageSize) ? (pageSize as number) : [pageSize, setPageSize],
    1,
    Infinity
  )

  const pageCount = createMemo(() => Math.max(1, Math.ceil(unAccessor(total) / unAccessor(currentPageSize))))

  const [currentPage, setCurrentPage] = useClamp(
    setPage === undefined || isNumber(page) ? (page as number) : [page, setPage],
    1,
    pageCount
  )

  const isFirstPage = createMemo(() => currentPage() === 1)
  const isLastPage = createMemo(() => currentPage() === pageCount())

  if (isAccessor(page)) syncSignal([page, setPage!], [currentPage, setCurrentPage], { defer: true })

  if (isAccessor(pageSize)) syncSignal([pageSize, setPageSize!], [currentPageSize, setCurrentPageSize], { defer: true })

  function prev() {
    setCurrentPage(state => state - 1)
  }

  function next() {
    setCurrentPage(state => state + 1)
  }

  const returnValue = {
    currentPage,
    setCurrentPage,
    currentPageSize,
    setCurrentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next
  }

  createEffect(
    on(
      currentPage,
      () => {
        onPageChange(reactive(returnValue))
      },
      { defer: true }
    )
  )

  createEffect(
    on(
      currentPageSize,
      () => {
        onPageSizeChange(reactive(returnValue))
      },
      { defer: true }
    )
  )

  createEffect(
    on(
      pageCount,
      () => {
        onPageCountChange(reactive(returnValue))
      },
      { defer: true }
    )
  )

  return returnValue
}
