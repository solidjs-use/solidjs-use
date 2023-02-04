import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { onLongPress } from 'solidjs-use'

const Demo = () => {
  const [htmlRef, setHtmlRef] = createSignal<HTMLElement | null>(null)
  const [htmlRefOptions, setHtmlRefOptions] = createSignal<HTMLElement | null>(null)

  const [longPressed, setLongPressed] = createSignal(false)

  const onLongPressCallback = () => {
    setLongPressed(true)
  }

  const reset = () => {
    setLongPressed(false)
  }

  onLongPress(htmlRef, onLongPressCallback)
  onLongPress(htmlRefOptions, onLongPressCallback, { delay: 1000 })
  return (
    <>
      <p>
        Long Pressed: <BooleanDisplay value={longPressed()} />
      </p>
      <button ref={setHtmlRef} class="ml-2 button small">
        Press long (500ms)
      </button>
      <button ref={setHtmlRefOptions} class="ml-2 button small">
        Press long (1000ms)
      </button>
      <button class="ml-2 button small" onClick={reset}>
        Reset
      </button>
    </>
  )
}

export default Demo
