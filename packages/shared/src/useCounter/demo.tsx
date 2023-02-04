import { useCounter } from 'solidjs-use'

const Demo = () => {
  const { count, inc, dec, set, reset } = useCounter()

  return (
    <>
      <div>
        <p>Count:{count()}</p>
        <button onClick={() => inc()}>Increment</button>
        <button onClick={() => dec()}>Decrement</button>
        <button onClick={() => inc(5)}>Increment(+5)</button>
        <button onClick={() => dec(5)}>Decrement(-5)</button>
        <button onClick={() => set(100)}>Set(100)</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </>
  )
}

export default Demo
