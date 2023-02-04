import { Note } from '@solidjs-use/docs-components'
import { createSignal, For } from 'solid-js'
import { formatDate, useCounter, useThrottledHistoryTravel } from 'solidjs-use'
import type { Setter } from 'solid-js'

const Demo = () => {
  const format = (ts: number) => formatDate(new Date(ts), 'YYYY-MM-DD HH:mm:ss')
  const [delay, setDelay] = createSignal(1000)

  const { inc, dec, count, set } = useCounter()
  const { history, undo, redo, canUndo, canRedo } = useThrottledHistoryTravel([count, set as Setter<number>], {
    capacity: 10,
    throttle: delay,
    trailing: true
  })

  return (
    <>
      <div>Count: {count()}</div>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
      <span class="ml-2">/</span>
      <button disabled={!canUndo()} onClick={() => undo()}>
        Undo
      </button>
      <button disabled={!canRedo()} onClick={() => redo()}>
        Redo
      </button>
      <br />
      <span>Delay (in ms):</span>
      <input value={delay()} onInput={e => setDelay(Number(e.currentTarget.value))} type="number" />
      <br />
      <br />
      <Note>History (limited to 10 records for demo)</Note>
      <div class="code-block mt-4">
        <For each={history()}>
          {h => (
            <div>
              <span class="opacity-50 mr-2 font-mono">{format(h.timestamp)}</span>
              <span class="font-mono">
                {'{ value: '} {h.snapshot} {' }'}
              </span>
            </div>
          )}
        </For>
      </div>
    </>
  )
}

export default Demo
