---
category: Sensors
---

# useFocusWithin

Reactive utility to track if an element or one of its decendants has focus. It is meant to match the behavior of the `:focus-within` CSS pseudo-class. A common use case would be on a form element to see if any of its inputs currently have focus.

## Basic Usage

```tsx
import { useFocusWithin } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()

  const focused = useFocusWithin(target)

  createEffect(() => {
    if (focused()) console.log('Target contains the focused element')
    else console.log('Target does NOT contain the focused element')
  })

  return (
    <form ref={setTarget}>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Password" />
    </form>
  )
}

export default Demo
```
