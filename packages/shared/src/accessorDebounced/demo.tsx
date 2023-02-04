import { Note } from '@solidjs-use/docs-components'
import { createEffect, createSignal, on } from 'solid-js'
import { accessorDebounced } from 'solidjs-use'

const Demo = () => {
  const [input, setInput] = createSignal('')
  const throttled = accessorDebounced(input, 1000)
  const [updated, setUpdated] = createSignal(0)

  createEffect(
    on(
      throttled,
      () => {
        setUpdated(state => state + 1)
      },
      { defer: true }
    )
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
        <Note>Delay is set to 1000ms for this demo.</Note>

        <p>Throttled: {throttled()}</p>
        <p>Times Updated: {updated()}</p>
      </div>
    </>
  )
}

export default Demo
