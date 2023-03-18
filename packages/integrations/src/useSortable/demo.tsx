import { useSortable } from '@solidjs-use/integrations/useSortable'
import { createSignal, For } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement | null>(null)
  const [list, setList] = createSignal([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' }
  ])

  useSortable(el, [list, setList], {
    animation: 150
  })
  return (
    <>
      <div ref={setEl} class="flex flex-col gap-2 p-4 w-300px h-200px m-auto bg-gray-500/5 rounded">
        <For each={list()}>{item => <div class="h20 bg-gray-500/5 rounded p-3">{item.name}</div>}</For>
      </div>
      <div class="text-center">{JSON.stringify(list())}</div>
    </>
  )
}

export default Demo
