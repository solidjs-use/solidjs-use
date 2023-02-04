import { Note } from '@solidjs-use/docs-components'
import { createMemo, For } from 'solid-js'
import { useActiveElement } from 'solidjs-use'

const Demo = () => {
  const activeElement = useActiveElement()
  const key = createMemo(() => activeElement()?.dataset?.id ?? 'null')

  return (
    <div>
      <Note class="mb-3">Select the inputs below to see the changes</Note>
      <div
        class="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-2"
      >
        <For each={Array.from({ length: 6 })}>
          {(_, i) => <input v-for="i in 6" type="text" data-id={i()} class="!my-0 !min-w-0" placeholder={`${i()}`} />}
        </For>
      </div>
      <div class="mt-2">
        Current Active Element:&nbsp;
        <span class="text-primary">{key()}</span>
      </div>
    </div>
  )
}

export default Demo
