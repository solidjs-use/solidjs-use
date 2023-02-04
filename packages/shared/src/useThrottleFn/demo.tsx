import { Note } from '@solidjs-use/docs-components'
import { useThrottleFn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [updated, setUpdated] = createSignal(0)
  const [clicked, setClicked] = createSignal(0)

  const throttledFn = useThrottleFn(() => {
    setUpdated(state => state + 1)
  }, 1000)

  const clickedFn = () => {
    setClicked(state => state + 1)
    throttledFn()
  }

  return (
    <>
      <button onClick={() => clickedFn()}>Smash me!</button>
      <Note>Delay is set to 1000ms for this demo..</Note>
      <p>Button clicked: {clicked()}</p>
      <p>Event handler called: {updated()}</p>
    </>
  )
}

export default Demo
