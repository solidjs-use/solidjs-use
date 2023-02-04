import { Note } from '@solidjs-use/docs-components'
import { useDebounceFn } from '@solidjs-use/shared'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [updated, setUpdated] = createSignal(0)
  const [clicked, setClicked] = createSignal(0)

  const clickedFn = () => {
    setClicked(state => state + 1)
    debouncedFn()
  }

  const debouncedFn = useDebounceFn(
    () => {
      setUpdated(state => state + 1)
    },
    1000,
    { maxWait: 5000 }
  )

  return (
    <>
      <button onClick={() => clickedFn()}>Smash me!</button>
      <Note>Delay is set to 1000ms and maxWait is set to 5000ms for this demo.</Note>
      <p>Button clicked: {clicked()}</p>
      <p>Event handler called: {updated()}</p>
    </>
  )
}

export default Demo
