import { useTimeout } from 'solidjs-use'
const Demo = () => {
  const { ready, start } = useTimeout(1000, { controls: true })
  return (
    <>
      <div>
        <p>Ready: {ready().toString()}</p>
        <button disabled={!ready()} onClick={() => start()}>
          Start Again
        </button>
      </div>
    </>
  )
}

export default Demo
