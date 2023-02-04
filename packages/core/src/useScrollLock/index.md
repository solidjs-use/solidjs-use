---
category: Sensors
---

# useScrollLock

Lock scrolling of the element.

## Usage

```tsx
import { useScrollLock } from 'solidjs-use'
import { createSignal } from 'solid-js'

const Demo = () => {
  const [el, setEl] = createSignal<HTMLElement>()
  const [isLock, setIsLock] = useScrollLock(el)
  // setIsLock(true) // lock
  // setIsLock(false) // unlock
  return <div ref={setEl}></div>
}
```
