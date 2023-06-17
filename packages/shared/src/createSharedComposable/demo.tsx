import { createSharedComposable, useCounter } from 'solidjs-use'

const useSharedCounter = createSharedComposable(useCounter)

function Demo1 () {
  const { count, inc, dec } = useSharedCounter()

  return (
    <div>
      <div>count: {count()}</div>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
    </div>
  )
}

function Demo2 () {
  const { count, inc, dec } = useSharedCounter()

  return (
    <div>
      <div>count: {count()}</div>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
    </div>
  )
}

const Demo = () => (
    <>
      <Demo1 />
      <Demo2 />
    </>
)

export default Demo
