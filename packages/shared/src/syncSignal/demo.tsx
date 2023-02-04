import { createSignal } from 'solid-js'
import { syncSignal } from 'solidjs-use'

const Demo = () => {
  const a = createSignal('')
  const b = createSignal('')

  syncSignal(a, b)
  return (
    <>
      <input value={a[0]()} onInput={e => a[1](e.currentTarget.value)} placeholder="A" type="text" />
      <input value={b[0]()} onInput={e => b[1](e.currentTarget.value)} placeholder="B" type="text" />
    </>
  )
}

export default Demo
