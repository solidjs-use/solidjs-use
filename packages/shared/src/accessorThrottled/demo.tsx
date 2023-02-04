import { Note } from '@solidjs-use/docs-components'
import { createEffect, createSignal, on } from 'solid-js'
import { accessorThrottled } from 'solidjs-use'

const Demo = () => {
  const trailing = true
  const leading = false
  const [input, setInput] = createSignal('')
  const throttled = accessorThrottled(input, 1000, trailing, leading)
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
        <p>Trailing: {trailing.toString()}</p>
        <p>Leading: {leading.toString()}</p>
      </div>
    </>
  )
}

export default Demo
