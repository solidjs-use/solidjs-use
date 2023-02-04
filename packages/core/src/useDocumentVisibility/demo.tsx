import { createEffect, createSignal, on } from 'solid-js'
import { useDocumentVisibility, useTimeoutFn } from 'solidjs-use'

const Demo = () => {
  const startMessage = '💡 Minimize the page or switch tab then return'
  const [message, setMessage] = createSignal(startMessage)
  const visibility = useDocumentVisibility()

  const timeout = useTimeoutFn(() => {
    setMessage(startMessage)
  }, 3000)

  createEffect(
    on(visibility, (current, previous) => {
      if (current === 'visible' && previous === 'hidden') {
        setMessage('🎉 Welcome back!')
        timeout.start()
      }
    })
  )
  return (
    <>
      <div>{message()}</div>
    </>
  )
}

export default Demo
