import { createSignal, Show } from 'solid-js'
import { rand, useIntervalFn } from 'solidjs-use'

const Demo = () => {
  const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
  const [word, setWord] = createSignal('Hello')
  const [interval, setInterval] = createSignal(500)

  const { pause, resume, isActive } = useIntervalFn(() => {
    setWord(greetings[rand(0, greetings.length - 1)])
  }, interval)
  return (
    <>
      <div>
        <p>{word()}</p>
        <p>
          interval:
          <input
            value={interval()}
            onInput={e => setInterval(Number(e.currentTarget.value))}
            type="number"
            placeholder="interval"
          />
        </p>
        <Show when={isActive()}>
          <button class="orange" onClick={() => pause()}>
            {' '}
            Pause{' '}
          </button>
        </Show>
        <Show when={!isActive()}>
          <button onClick={() => resume()}>Resume</button>
        </Show>
      </div>
    </>
  )
}

export default Demo
