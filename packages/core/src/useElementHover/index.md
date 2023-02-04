---
category: Sensors
---

# useElementHover

Reactive element's hover state.

## Usage

```tsx
import { createSignal } from 'solid-js'
import { useElementHover } from 'solidjs-use'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const isHovered = useElementHover(el)

  return <button ref={setEl}>{isHovered().toString()}</button>
}
```
