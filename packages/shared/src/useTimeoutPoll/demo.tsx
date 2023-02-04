import { createSignal } from 'solid-js'
import { useTimeoutPoll } from 'solidjs-use'
import { promiseTimeout } from '../utils'

const Demo = () => {
  const [count, setCount] = createSignal(0)

  const fetchData = async () => {
    await promiseTimeout(1000)
    setCount(count => count + 1)
  }

  const { isActive, pause, resume } = useTimeoutPoll(fetchData, 1000)

  return (
    <>
      <div>
        <div>Count: {count()}</div>
        <div>isActive: {isActive().toString()}</div>
        <div>
          <button onClick={pause}>pause</button>
          <button onClick={resume}>resume</button>
        </div>
      </div>
    </>
  )
}

export default Demo
