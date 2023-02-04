---
category: Sensors
---

# useSwipe

Reactive swipe detection based on [`TouchEvents`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent).

## Usage

```jsx
import { useSwipe } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [target, setTarget] = (createSignal < HTMLElement) | (null > null)

  const { isSwiping, direction } = useSwipe(target)

  return <div ref={setTarget}>Swipe here</div>
}
```
