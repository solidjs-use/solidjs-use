import { createMemo, createSignal, For } from 'solid-js'
import { useVirtualList } from 'solidjs-use'

const Demo = () => {
  const [index, setIndex] = createSignal(0)
  const [search, setSearch] = createSignal('')

  const allItems = Array.from({ length: 9999 }).map((_, i) => ({
    height: i % 2 === 0 ? 42 : 84,
    size: i % 2 === 0 ? 'small' : 'large'
  }))

  const filteredItems = createMemo(() => allItems.filter(i => i.size.startsWith(search().toLowerCase())))

  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(filteredItems, {
    itemHeight: i => filteredItems()[i].height + 8,
    overscan: 10
  })
  const handleScrollTo = () => {
    scrollTo(index())
  }

  return (
    <>
      <div>
        <div>
          <div class="inline-block mr-4">
            Jump to index
            <input
              value={index()}
              onInput={e => setIndex(Number(e.currentTarget.value))}
              placeholder="Index"
              type="number"
            />
          </div>
          <button type="button" onClick={handleScrollTo}>
            Go
          </button>
        </div>
        <div>
          <div class="inline-block mr-4">
            Filter list by size
            <input
              value={search()}
              onInput={e => setSearch(e.currentTarget.value)}
              placeholder="e.g. small, medium, large"
              type="search"
            />
          </div>
        </div>
        <div
          ref={containerProps.ref}
          style={containerProps.style}
          onScroll={containerProps.onScroll}
          class="h-300px overflow-auto p-2 bg-gray-500/5 rounded"
        >
          <div style={wrapperProps().style}>
            <For each={list()}>
              {({ data, index }) => (
                <div
                  class="border border-$c-divider mb-2"
                  style={{
                    height: `${data.height}px`,
                    display: 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                  }}
                >
                  Row {index}{' '}
                  <span opacity="70" m="l-1">
                    ({data.size})
                  </span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo
