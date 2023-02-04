import { createSignal } from 'solid-js'
import { watchTriggerable } from 'solidjs-use'

const Demo = () => {
  const [log, setLog] = createSignal('')
  const [source, setSource] = createSignal(0)

  const { trigger, ignoreUpdates } = watchTriggerable(source, async v => {
    setLog(log => (log += `The value is "${v}"\n`))
  })

  const clear = () => {
    ignoreUpdates(() => {
      setSource(0)
      setLog('')
    })
  }
  const update = () => {
    setSource(state => state + 1)
  }
  return (
    <>
      <div>Value: {source()}</div>
      <button onClick={update}>Update</button>
      <button class="orange" onClick={trigger}>
        Manual Trigger
      </button>
      <button onClick={clear}>Reset</button>
      <br />
      <pre>{log()}</pre>
    </>
  )
}

export default Demo
