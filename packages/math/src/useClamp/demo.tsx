import { useClamp } from '@solidjs-use/math'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [min, setMin] = createSignal(0)
  const [max, setMax] = createSignal(10)

  const [value, setValue] = useClamp(0, min, max)

  return (
    <>
      <div>
        min:
        <input id="input" value={min()} onInput={e => setMin(Number(e.currentTarget.value))} type="number" />
        max:
        <input id="input" value={max()} onInput={e => setMax(Number(e.currentTarget.value))} type="number" />
        value:{value()}
        <div>
          <button onClick={() => setValue(state => state - 1)}>Decrement</button>
          <button onClick={() => setValue(state => state + 1)}>Increment</button>
        </div>
      </div>
    </>
  )
}

export default Demo
