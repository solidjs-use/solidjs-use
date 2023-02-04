---
category: Sensors
---

# usePointerSwipe

Reactive swipe detection based on [PointerEvents](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent).

## Usage

```tsx
import { usePointerSwipe } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [target, setTarget] = createSignal<HTMLElement>()
  const { isSwiping, direction } = usePointerSwipe(el)
  return <div ref={setTarget}></div>
}
```
