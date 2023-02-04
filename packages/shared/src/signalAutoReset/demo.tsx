import { signalAutoReset } from 'solidjs-use'

const Demo = () => {
  const [message, setMessage] = signalAutoReset('Default message', 1000)

  return (
    <>
      <div>
        <button onClick={() => setMessage('changed')}>Change Message</button>
        <p>{message()}</p>
      </div>
    </>
  )
}

export default Demo
