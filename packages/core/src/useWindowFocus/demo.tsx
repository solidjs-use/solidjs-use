import { createEffect, createSignal, on } from 'solid-js'
import { useWindowFocus } from 'solidjs-use'

const Demo = () => {
  const startMessage = '💡 Click somewhere outside of the document to unfocus.'
  const [message, setMessage] = createSignal(startMessage)
  const focused = useWindowFocus()
  createEffect(
    on(focused, isFocused => {
      if (isFocused) {
        setMessage(startMessage)
      } else {
        setMessage('ℹ Tab is unfocused')
      }
    })
  )
  return <div attr:data-testid="useWindowFocus">{message()}</div>
}

export default Demo
