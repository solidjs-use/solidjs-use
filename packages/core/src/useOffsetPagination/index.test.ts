import { runAsyncHook, runHook } from '@dream2023/cypress-ct-solid-js'
import { nextTick } from '@solidjs-use/shared/solid-to-vue'
import { createSignal, getOwner } from 'solid-js'
import { useOffsetPagination } from '.'
import type { Accessor, Owner, Setter } from 'solid-js'
import type { UseOffsetPaginationReturn } from '.'

describe('useOffsetPagination', () => {
  it('should be defined', () => {
    expect(useOffsetPagination).to.be.exist
  })

  describe('when page is 1', () => {
    let currentPage: UseOffsetPaginationReturn['currentPage']
    let prev: UseOffsetPaginationReturn['prev']
    let next: UseOffsetPaginationReturn['next']
    let owner: Owner | null

    beforeEach(() => {
      runHook(() => {
        owner = getOwner()
        ;({ currentPage, prev, next } = useOffsetPagination({
          total: 40,
          page: 1,
          pageSize: 10
        }))
      })
    })
    it("returns the initial page number when prev() or next() haven't been called", () => {
      runHook(() => {
        expect(currentPage()).to.be.eq(1)
      }, owner)
    })

    it('increments after calling next() when there are still pages left', () => {
      runHook(() => {
        next()
        expect(currentPage()).to.be.eq(2)
        next()
        expect(currentPage()).to.be.eq(3)
      }, owner)
    })

    it("doesn't decrement after calling prev() when still on the first page", () => {
      runHook(() => {
        prev()
        expect(currentPage()).to.be.eq(1)
      }, owner)
    })

    it("doesn't increment past the last page", () => {
      runHook(() => {
        next()
        next()
        next() // this puts us on the last page
        next()
        expect(currentPage()).to.be.eq(4)
      }, owner)
    })
  })

  describe('when page is something other than 1', () => {
    let currentPage: UseOffsetPaginationReturn['currentPage']
    let owner: Owner | null
    beforeEach(() => {
      runHook(() => {
        owner = getOwner()
        ;({ currentPage } = useOffsetPagination({
          total: 40,
          page: 3,
          pageSize: 10
        }))
      })
    })

    it("returns the page number when prev() or next() haven't been called", () => {
      runHook(() => {
        expect(currentPage()).to.be.eq(3)
      }, owner)
    })
  })

  describe('when total is 0', () => {
    let currentPage: UseOffsetPaginationReturn['currentPage']
    let owner: Owner | null

    beforeEach(() => {
      runHook(() => {
        owner = getOwner()
        ;({ currentPage } = useOffsetPagination({
          total: 0
        }))
      })
    })

    it('returns a currentPage of 1', () => {
      runHook(() => {
        expect(currentPage()).to.be.eq(1)
      }, owner)
    })
  })

  describe('when the page is outside of the range of possible pages', () => {
    let currentPage: UseOffsetPaginationReturn['currentPage']
    const [page, setPage] = createSignal(0)
    let owner: Owner | null

    beforeEach(() => {
      runHook(() => {
        owner = getOwner()
        ;({ currentPage } = useOffsetPagination({
          total: 40,
          page,
          setPage,
          pageSize: 10
        }))
      })
    })

    it('returns the maximum page number possible', () => {
      runHook(() => {
        setPage(123456) // outside maximum range
        expect(currentPage()).to.be.eq(4)
      }, owner)
    })

    it('clamps the lower end of the range to 1', () => {
      runHook(() => {
        setPage(1)
        expect(currentPage()).to.be.eq(1)
        setPage(0)
        expect(currentPage()).to.be.eq(1)
        setPage(-1234)
        expect(currentPage()).to.be.eq(1)
      }, owner)
    })
  })

  describe('when the page is a Accessor', () => {
    let currentPage: UseOffsetPaginationReturn['currentPage']
    let page: Accessor<number>
    let setPage: Setter<number>
    let owner: Owner | null

    beforeEach(() => {
      runHook(() => {
        owner = getOwner()
        ;[page, setPage] = createSignal(0)
        setPage(2)
        ;({ currentPage } = useOffsetPagination({
          total: 40,
          page,
          setPage,
          pageSize: 10
        }))
      })
    })

    it('returns the correct currentPage', async () => {
      runHook(() => {
        expect(currentPage()).to.be.eq(2)
        setPage(3)
        expect(currentPage()).to.be.eq(3)
        setPage(1)
        expect(currentPage()).to.be.eq(1)
        setPage(-1)
        expect(currentPage()).to.be.eq(1)
      }, owner)
    })

    it('clamps out of range numbers to the first and last pages', () => {
      runHook(() => {
        setPage(-1)
        expect(currentPage()).to.be.eq(1)

        setPage(Infinity)
        expect(currentPage()).to.be.eq(4)
      }, owner)
    })
  })

  describe('currentPageSize', () => {
    describe('when pageSize is given as a value', () => {
      let currentPageSize: UseOffsetPaginationReturn['currentPageSize']
      let next: UseOffsetPaginationReturn['next']
      let owner: Owner | null

      beforeEach(() => {
        runHook(() => {
          owner = getOwner()
          ;({ currentPageSize, next } = useOffsetPagination({
            total: 45,
            page: 1,
            pageSize: 14
          }))
        })
      })

      it('returns the given initial page size', () => {
        runHook(() => {
          expect(currentPageSize()).to.be.eq(14)
        }, owner)
      })

      it('does not change currentPageSize when navigating through to the last page', () => {
        runHook(() => {
          next()
          expect(currentPageSize()).to.be.eq(14)
          next()
          expect(currentPageSize()).to.be.eq(14)
          next()
          expect(currentPageSize()).to.be.eq(14)
          next()
          expect(currentPageSize()).to.be.eq(14)
        }, owner)
      })
    })

    describe('when pageSize is given as a Accessor', () => {
      let currentPageSize: UseOffsetPaginationReturn['currentPageSize']
      const [pageSize, setPageSize] = createSignal(11)
      let owner: Owner | null

      beforeEach(() => {
        runHook(() => {
          owner = getOwner()
          ;({ currentPageSize } = useOffsetPagination({
            pageSize,
            setPageSize
          }))
        })
      })

      it('changes when the given pageSize changes', () => {
        runHook(() => {
          expect(currentPageSize()).to.be.eq(11)
          setPageSize(23)
          expect(currentPageSize()).to.be.eq(23)
        }, owner)
      })
    })

    describe('when pageSize is not given', () => {
      let currentPageSize: UseOffsetPaginationReturn['currentPageSize']
      let owner: Owner | null

      beforeEach(() => {
        runHook(() => {
          owner = getOwner()
          ;({ currentPageSize } = useOffsetPagination({
            total: 45,
            page: 1
          }))
        })
      })

      it('defaults to 10', () => {
        runHook(() => {
          expect(currentPageSize()).to.be.eq(10)
        }, owner)
      })
    })
  })

  describe('isFirstPage', () => {
    it('returns true when on the first page', () => {
      runHook(() => {
        const { isFirstPage, prev } = useOffsetPagination({
          total: 35,
          pageSize: 10
        })

        expect(isFirstPage()).to.be.eq(true)
        prev()
        expect(isFirstPage()).to.be.eq(true)
      })
    })

    it('returns false when not the first page', () => {
      runHook(() => {
        const { isFirstPage, next } = useOffsetPagination({
          total: 35,
          pageSize: 10
        })

        next()
        expect(isFirstPage()).to.be.eq(false)
        next()
        expect(isFirstPage()).to.be.eq(false)
        next()
        expect(isFirstPage()).to.be.eq(false)
      })
    })
  })

  describe('isLastPage', () => {
    it('returns true when on the last page', () => {
      runHook(() => {
        const { isLastPage, next } = useOffsetPagination({
          total: 35,
          pageSize: 20
        })

        next()
        expect(isLastPage()).to.be.eq(true)
        next()
        expect(isLastPage()).to.be.eq(true)
      })
    })

    it('returns false when not the last page', () => {
      runHook(() => {
        const { isLastPage, prev } = useOffsetPagination({
          total: 35,
          pageSize: 20
        })

        expect(isLastPage()).to.be.eq(false)
        prev()
        expect(isLastPage()).to.be.eq(false)
      })
    })
  })

  describe('onPageChange', () => {
    it('is called when the page changes', () => {
      return runAsyncHook(async () => {
        const onPageChange = cy.spy()
        const [page, setPage] = createSignal(1)

        useOffsetPagination({
          total: 50,
          page,
          setPage,
          onPageChange
        })

        await nextTick()
        expect(onPageChange).to.be.callCount(0)

        setPage(2)
        await nextTick()
        expect(onPageChange).to.be.callCount(1)

        setPage(1)
        await nextTick()
        expect(onPageChange).to.be.callCount(2)

        setPage(9999) // out of range, so we go to the last page
        await nextTick()
        expect(onPageChange).to.be.callCount(3)

        setPage(9998) // still out of range, so we stay on the last page
        await nextTick()
        expect(onPageChange).to.be.callCount(3) // does not change
      })
    })

    it('is called with the correct UseOffsetPaginationReturn values', () => {
      return runAsyncHook(async () => {
        const onPageChange = cy.spy(data => {
          return {
            currentPage: data.currentPage(),
            currentPageSize: data.currentPageSize(),
            isFirstPage: data.isFirstPage(),
            isLastPage: data.isLastPage(),
            next: data.next,
            pageCount: 4,
            prev: data.next
          }
        })
        const [page, setPage] = createSignal(1)

        useOffsetPagination({
          total: 35,
          page,
          setPage,
          onPageChange
        })

        await nextTick()
        setPage(2)
        await nextTick()
        expect(onPageChange.returnValues[0]).to.be.deep.contain({
          currentPage: 2,
          currentPageSize: 10,
          isFirstPage: false,
          isLastPage: false,
          pageCount: 4
        })
        setPage(3)
        await nextTick()
        expect(onPageChange.returnValues[1]).to.be.deep.contain({
          currentPage: 3,
          currentPageSize: 10,
          isFirstPage: false,
          isLastPage: false,
          pageCount: 4
        })

        setPage(4)
        await nextTick()
        expect(onPageChange.returnValues[2]).to.be.deep.contain({
          currentPage: 4,
          currentPageSize: 10,
          isFirstPage: false,
          isLastPage: true,
          pageCount: 4
        })

        setPage(1)
        await nextTick()
        expect(onPageChange.returnValues[3]).to.be.deep.contain({
          currentPage: 1,
          currentPageSize: 10,
          isFirstPage: true,
          isLastPage: false,
          pageCount: 4
        })
      })
    })
  })

  describe('onPageSizeChange', () => {
    it('is called when the page size changes', () => {
      return runAsyncHook(async () => {
        const onPageSizeChange = cy.spy()
        const [pageSize, setPageSize] = createSignal(5)

        useOffsetPagination({
          total: 50,
          pageSize,
          setPageSize,
          onPageSizeChange
        })

        await nextTick()
        expect(onPageSizeChange).to.be.callCount(0)
        setPageSize(2)
        await nextTick()
        expect(onPageSizeChange).to.be.callCount(1)
        setPageSize(7)
        await nextTick()
        expect(onPageSizeChange).to.be.callCount(2)
      })
    })

    it('is called with the correct UseOffsetPaginationReturn values', () => {
      return runAsyncHook(async () => {
        const [pageSize, setPageSize] = createSignal(5)
        const onPageSizeChange = cy.spy(data => {
          return {
            currentPage: data.currentPage(),
            currentPageSize: data.currentPageSize(),
            isFirstPage: data.isFirstPage(),
            isLastPage: data.isLastPage(),
            next: data.next,
            pageCount: data.pageCount(),
            prev: data.next
          }
        })

        useOffsetPagination({
          total: 35,
          pageSize,
          setPageSize,
          onPageSizeChange
        })

        await nextTick()
        setPageSize(3)
        await nextTick()
        expect(onPageSizeChange.returnValues[0]).to.be.deep.contain({
          currentPage: 1,
          currentPageSize: 3,
          isFirstPage: true,
          isLastPage: false,
          pageCount: 12
        })

        setPageSize(30)
        await nextTick()
        expect(onPageSizeChange.returnValues[1]).to.be.deep.contain({
          currentPage: 1,
          currentPageSize: 30,
          isFirstPage: true,
          isLastPage: false,
          pageCount: 2
        })
      })
    })
  })

  describe('onPageCountChange', () => {
    it('is called when the page count changes', () => {
      return runAsyncHook(async () => {
        const onPageCountChange = cy.spy()
        const [pageSize, setPageSize] = createSignal(5)

        useOffsetPagination({
          total: 50,
          pageSize,
          setPageSize,
          onPageCountChange
        })

        await nextTick()
        expect(onPageCountChange).to.be.callCount(0)
        setPageSize(2)
        await nextTick()
        expect(onPageCountChange).to.be.callCount(1)
        setPageSize(7)
        await nextTick()
        expect(onPageCountChange).to.be.callCount(2)
      })
    })

    it('is called with the correct UseOffsetPaginationReturn values', () => {
      return runAsyncHook(async () => {
        const [pageSize, setPageSize] = createSignal(5)
        const onPageCountChange = cy.spy(data => {
          return {
            currentPage: data.currentPage(),
            currentPageSize: data.currentPageSize(),
            isFirstPage: data.isFirstPage(),
            isLastPage: data.isLastPage(),
            next: data.next,
            pageCount: data.pageCount(),
            prev: data.next
          }
        })

        useOffsetPagination({
          total: 35,
          pageSize,
          setPageSize,
          onPageCountChange
        })

        await nextTick()
        setPageSize(3)
        await nextTick()
        expect(onPageCountChange.returnValues[0]).to.be.deep.contain({
          currentPage: 1,
          currentPageSize: 3,
          isFirstPage: true,
          isLastPage: false,
          pageCount: 12
        })

        setPageSize(30)
        await nextTick()
        expect(onPageCountChange.returnValues[1]).to.be.deep.contain({
          currentPage: 1,
          currentPageSize: 30,
          isFirstPage: true,
          isLastPage: false,
          pageCount: 2
        })
      })
    })
  })
})
