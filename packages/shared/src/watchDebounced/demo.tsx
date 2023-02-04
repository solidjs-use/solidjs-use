import { Note } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { watchDebounced } from 'solidjs-use'

const Demo = () => {
  const [input, setInput] = createSignal('')
  const [updated, setUpdated] = createSignal(0)

  watchDebounced(
    input,
    () => {
      setUpdated(state => state + 1)
    },
    { debounce: 1000, maxWait: 5000 }
  )
  return (
    <>
      <div>
        <input
          value={input()}
          onInput={e => setInput(e.currentTarget.value)}
          placeholder="Try to type anything..."
          type="text"
        />
        <Note>Delay is set to 1000ms and maxWait is set to 5000ms for this demo.</Note>
        <p>Input: {input()}</p>
        <p>Times Updated: {updated()}</p>
      </div>
    </>
  )
}

export default Demo
