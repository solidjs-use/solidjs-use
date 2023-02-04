import { Note } from '@solidjs-use/docs-components'
import { stringify } from '@solidjs-use/docs-utils'
import { createSignal } from 'solid-js'
import { useElementSize } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal(null)
  const rect = useElementSize(el)
  return (
    <>
      <div style="min-height: 300px">
        <Note class="mb-2">Resize the box to see changes</Note>
        <textarea ref={setEl} readonly class="resizer" value={stringify(rect)} />
      </div>
    </>
  )
}

export default Demo
