import { Note } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { watchIgnorable } from 'solidjs-use'

const Demo = () => {
  const [log, setLog] = createSignal('')
  const [count, setCount] = createSignal(0)
  const { ignoreUpdates } = watchIgnorable(count, v => setLog(log => (log += `Changed to "${v}"\n`)))
  const clear = () => {
    setCount(0)
    setLog('')
  }
  const update = () => {
    setCount(count => count + 1)
  }
  const ignoredUpdate = () => {
    ignoreUpdates(() => {
      setCount(count => count + 1)
    })
  }
  return (
    <>
      <div>Value: {count()}</div>
      <button onClick={update}>Update</button>
      <button class="orange" onClick={ignoredUpdate}>
        Ignored Update
      </button>
      <button onClick={clear}>Reset</button>

      <br />

      <Note>Log</Note>

      <pre>{log()}</pre>
    </>
  )
}

export default Demo
