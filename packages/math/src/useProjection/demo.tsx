import { useProjection } from '@solidjs-use/math'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [from] = createSignal<[number, number]>([0, 10])
  const [to] = createSignal<[number, number]>([10, 100])
  const [input, setInput] = createSignal(0)

  const output = useProjection(input, from, to)

  return (
    <>
      <div>
        <div>
          Projection from [{from()[0]}, {from()[1]}] to [{to()[0]}, {to()[1]}]
        </div>
        <div>
          <input
            id="input"
            value={input()}
            onInput={e => setInput(Number(e.currentTarget.value))}
            type="range"
            min={from()[0]}
            max={from()[1]}
          />
        </div>
        <div>Input: {input()}</div>
        <div>Output: {output()}</div>
      </div>
    </>
  )
}

export default Demo
