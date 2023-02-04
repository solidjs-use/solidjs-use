import { Note } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { useResizeObserver } from '.'

const Demo = () => {
  const [el, setEl] = createSignal(null)
  const [text, setText] = createSignal('')

  useResizeObserver(el, entries => {
    const [entry] = entries
    const { width, height } = entry.contentRect
    setText(`width: ${width}\nheight: ${height}`)
  })
  return (
    <>
      <Note class="mb-2">Resize the box to see changes</Note>
      <textarea ref={setEl} class="resizer" disabled value={text()} />
    </>
  )
}

export default Demo
