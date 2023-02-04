import { Note } from '@solidjs-use/docs-components'
import { createSignal, Show } from 'solid-js'
import { useClipboard, usePermission } from 'solidjs-use'

const Demo = () => {
  const [input, setInput] = createSignal('')
  const { text, isSupported, copy } = useClipboard()
  const permissionRead = usePermission('clipboard-read')
  const permissionWrite = usePermission('clipboard-write')

  return (
    <>
      <div>
        <Show when={isSupported()} fallback={<p>Your browser does not support Clipboard API</p>}>
          <div>
            <Note>
              Clipboard Permission: read <b>{permissionRead()}</b> | write <b>{permissionWrite()}</b>
            </Note>
            <p>
              Current copied: <code>{text() || 'none'}</code>
            </p>
            <input value={input()} onInput={e => setInput(e.currentTarget.value)} type="text" />
            <button onClick={() => copy(input())}>Copy</button>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Demo
