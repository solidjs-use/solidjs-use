import { Note } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { onStartTyping, watchPausable } from 'solidjs-use'

const Demo = () => {
  const [input, setInput] = createSignal<HTMLInputElement | null>()
  const [log, setLog] = createSignal('')
  const [source, setSource] = createSignal('')

  const watcher = watchPausable(source, v => {
    setLog(log => `${log}Changed to "${v}"\n`)
  })

  onStartTyping(() => input()?.focus())

  const clear = () => {
    setLog('')
  }
  const pause = () => {
    setLog(log => `${log}Paused\n`)
    watcher.pause()
  }
  const resume = () => {
    setLog(log => `${log}Resumed\n`)
    watcher.resume()
  }
  const { isActive } = watcher
  return (
    <>
      <div>
        <Note class="mb-2">Type something below to trigger the watch</Note>
        <input ref={setInput} type="text" value={source()} onInput={e => setSource(e.currentTarget.value)} />
        <div>Value: {source()}</div>
        <button disabled={!isActive()} class="orange" onClick={pause}>
          Pause
        </button>
        <button disabled={isActive()} onClick={resume}>
          Resume
        </button>
        <button onClick={clear}>Clear Log</button>
        <br />
        <br />
        <Note>Log</Note>
        <pre>{log()}</pre>
      </div>
    </>
  )
}

export default Demo
