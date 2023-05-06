import { createSignal } from 'solid-js'
import { useRafFn } from 'solidjs-use'

const Demo = () => {
  const [count, setCount] = createSignal(0)
  const { pause, resume } = useRafFn(() => setCount(count => count + 1))

  return (
    <>
      <div>
        <div>Count: {count()}</div>
        <button onClick={() => pause()}>pause</button>
        <button onClick={() => resume()}>resume</button>
      </div>
    </>
  )
}

export default Demo
