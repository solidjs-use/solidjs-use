import { createSignal } from 'solid-js'
import { syncSignals } from 'solidjs-use'

const Demo = () => {
  const [source, setSource] = createSignal('')
  const [target1, setTarget1] = createSignal('')
  const [target2, setTarget2] = createSignal('')

  syncSignals(source, [setTarget1, setTarget2])
  return (
    <>
      <div>
        <input value={source()} onInput={e => setSource(e.currentTarget.value)} placeholder="Source" type="text" />
        <input value={target1()} onInput={e => setTarget1(e.currentTarget.value)} placeholder="Target1" type="text" />
        <input value={target2()} onInput={e => setTarget2(e.currentTarget.value)} placeholder="Target2" type="text" />
      </div>
    </>
  )
}

export default Demo
