import { createSignal } from 'solid-js'
import { timestamp, useLastChanged, useTimeAgo } from 'solidjs-use'

const Demo = () => {
  const [input, setInput] = createSignal('')
  const ms = useLastChanged(input, { initialValue: timestamp() - 1000 * 60 * 5 })
  const timeAgo = useTimeAgo(ms)
  return (
    <>
      <div>
        <input
          value={input()}
          onInput={e => setInput(e.currentTarget.value)}
          type="text"
          placeholder="Type anything..."
        />
        <div>
          Last changed: <span class="text-primary">{timeAgo()}</span> <span class="opacity-50 font-mono">({ms()})</span>
        </div>
      </div>
    </>
  )
}

export default Demo
