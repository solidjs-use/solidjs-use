import { Note } from '@solidjs-use/docs-components'
import { createMemo } from 'solid-js'
import { useOnline } from 'solidjs-use'

const Demo = () => {
  const online = useOnline()

  const clazz = createMemo(() => (online() ? 'text-primary' : 'text-gray'))
  const text = createMemo(() => (online() ? 'Online' : 'Offline'))

  return (
    <>
      <Note class="mb-2">Disconnect your network to see changes</Note>
      <div>
        Status: <b class={clazz()}>{text()}</b>
      </div>
    </>
  )
}

export default Demo
