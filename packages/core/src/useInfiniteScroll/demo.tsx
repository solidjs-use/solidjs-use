import { createSignal, For } from 'solid-js'
import { useInfiniteScroll } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement | null>(null)
  const [data, setData] = createSignal([1, 2, 3, 4, 5, 6])

  useInfiniteScroll(
    el,
    () => {
      const length = data().length + 1
      setData(data => [...data, ...Array.from({ length: 5 }, (_, i) => length + i)])
    },
    { distance: 10 }
  )
  return (
    <>
      <div ref={setEl} class="flex flex-col gap-2 p-4 w-300px h-300px m-auto overflow-y-scroll bg-gray-500/5 rounded">
        {<For each={data()}>{item => <div class="h-30 bg-gray-500/5 rounded p-3">{item}</div>}</For>}
      </div>
    </>
  )
}

export default Demo
