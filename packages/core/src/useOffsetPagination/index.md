---
category: Utilities
---

# useOffsetPagination

Reactive offset pagination.

## Usage

```ts
import { useOffsetPagination } from 'solidjs-use'

const [data, setData] = createSignal([])
const [page, setPage] = createSignal(1)
const [pageSize, setPageSize] = createSignal(10)

function fetchData({ currentPage, currentPageSize }: { currentPage: Accessor<number>; currentPageSize: : Accessor<number> }) {
  fetch(currentPage(), currentPageSize()).then((responseData) => {
    setData(responseData)
  })
}

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: data().length,
  page,
  setPage,
  pageSize,
  setPageSize,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
})
```
