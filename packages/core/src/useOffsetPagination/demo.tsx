import { createSignal, For } from 'solid-js'
import { useOffsetPagination } from 'solidjs-use'
import type { Accessor } from 'solid-js'

const Demo = () => {
  interface User {
    id: number
    name: string
  }
  const [database, setDatabase] = createSignal<User[]>([])

  for (let i = 0; i < 80; i++) {
    setDatabase(data => [...data, { id: i, name: `user ${i}` }])
  }

  function fetch(page: number, pageSize: number) {
    return new Promise<User[]>(resolve => {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      setTimeout(() => {
        resolve(database().slice(start, end))
      }, 100)
    })
  }

  const [data, setData] = createSignal<User[]>([])
  const [page, setPage] = createSignal(1)
  const [pageSize, setPageSize] = createSignal(10)

  fetchData({
    currentPage: page,
    currentPageSize: pageSize
  })

  function fetchData({
    currentPage,
    currentPageSize
  }: {
    currentPage: Accessor<number>
    currentPageSize: Accessor<number>
  }) {
    fetch(currentPage(), currentPageSize()).then(responseData => {
      setData(responseData)
    })
  }

  const { currentPage, setCurrentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } =
    useOffsetPagination({
      total: database().length,
      page,
      setPage,
      pageSize,
      setPageSize,
      onPageChange: fetchData,
      onPageSizeChange: fetchData
    })
  return (
    <>
      <div class="gap-x-4 gap-y-2 grid-cols-2 inline-grid items-center">
        <div opacity="50">total:</div>
        <div>{database().length}</div>
        <div opacity="50">pageCount:</div>
        <div>{pageCount()}</div>
        <div opacity="50">currentPageSize:</div>
        <div>{currentPageSize()}</div>
        <div opacity="50">currentPage:</div>
        <div>{currentPage()}</div>
        <div opacity="50">isFirstPage:</div>
        <div>{isFirstPage().toString()}</div>
        <div opacity="50">isLastPage:</div>
        <div>{isLastPage().toString()}</div>
      </div>
      <div class="my-4">
        <button disabled={isFirstPage()} onClick={prev}>
          prev
        </button>
        {
          <For each={Array.from({ length: pageCount() }).map((item, i) => i + 1)}>
            {i => (
              <button disabled={currentPage() === i} onClick={() => setCurrentPage(i)}>
                {i}
              </button>
            )}
          </For>
        }
        <button disabled={isLastPage()} onClick={next}>
          next
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td class="py px">id</td>
            <td class="py px">name</td>
          </tr>
        </thead>
        <For each={data()}>
          {d => (
            <tr>
              <td class="py px">{d.id}</td>
              <td class="py px">{d.name}</td>
            </tr>
          )}
        </For>
      </table>
    </>
  )
}

export default Demo
