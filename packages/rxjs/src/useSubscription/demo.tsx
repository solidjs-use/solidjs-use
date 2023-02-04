import { Note } from '@solidjs-use/docs-components'
import { useSubscription } from '@solidjs-use/rxjs'
import { interval } from 'rxjs'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [count, setCount] = createSignal(0)

  useSubscription(
    interval(1000).subscribe(() => {
      setCount(state => state + 1)
    })
  )

  return (
    <>
      <Note>Update every 1s</Note>
      <p>Counter: {count()}</p>
    </>
  )
}

export default Demo
