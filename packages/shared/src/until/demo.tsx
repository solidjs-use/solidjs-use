import { Note } from '@solidjs-use/docs-components'
import { invoke, until, useCounter } from 'solidjs-use'

const Demo = () => {
  const { count, inc, dec } = useCounter()

  invoke(async () => {
    await until(count).toBe(7)

    alert('You got 7!')
  })
  return (
    <>
      <Note>Add to 7 to show the alert.</Note>
      <p>Count: {count()}</p>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
    </>
  )
}

export default Demo
