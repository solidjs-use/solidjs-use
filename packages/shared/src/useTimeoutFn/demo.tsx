import { createSignal } from 'solid-js'
import { useTimeoutFn } from 'solidjs-use'

const Demo = () => {
  const defaultText = 'Please wait for 3 seconds'
  const [text, setText] = createSignal(defaultText)
  const { start, isPending } = useTimeoutFn(() => {
    setText('Fired!')
  }, 3000)

  const restart = () => {
    setText(defaultText)
    start()
  }

  return (
    <>
      <div>
        <p>{text()}</p>
        <button classList={{ disabled: isPending() }} onClick={restart}>
          Restart
        </button>
      </div>
    </>
  )
}

export default Demo
