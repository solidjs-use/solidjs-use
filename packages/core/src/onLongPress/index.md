---
category: Sensors
---

# onLongPress

Listen for a long press on an element.

Function provides modifiers in options

- stop
- once
- prevent
- capture
- self

## Usage

```tsx
import { BooleanDisplay } from '@solidjs-use/docs-components'
import { createSignal } from 'solid-js'
import { onLongPress } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()

  const [longPressed, setLongPressed] = createSignal(false)

  const onLongPressCallback = (e: PointerEvent) => {
    setLongPressed(true)
  }

  const reset = () => {
    setLongPressed(false)
  }

  onLongPress(target, onLongPressCallback, { modifiers: { prevent: true } })
  return (
    <>
      <p>Long Pressed: {longPressed()}</p>
      <button ref={setTarget} class="ml-2 button small">
        Press long (500ms)
      </button>
      <button class="ml-2 button small" onClick={reset}>
        Reset
      </button>
    </>
  )
}

export default Demo
```
