---
category: Sensors
---

# onStartTyping

Fires when users start typing on non-editable elements.

## Usage

```tsx
import { onStartTyping } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [input, setInput] = createSignal<HTMLInputElement | null>(null)

  onStartTyping(() => {
    input()!.focus()
  })
  return <input ref={setInput} type="text" placeholder="Start typing to focus" />
}
```
