import { Note } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { onStartTyping } from 'solidjs-use'

const Demo = () => {
  const [input, setInput] = createSignal<HTMLInputElement | null>(null)

  onStartTyping(() => {
    input()!.focus()
  })
  return (
    <>
      <Note>Type anything</Note>
      <input ref={setInput} type="text" placeholder="Start typing to focus" />
    </>
  )
}

export default Demo
