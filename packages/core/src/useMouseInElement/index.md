---
category: Elements
---

# useMouseInElement

Reactive mouse position related to an element.

## Usage

```jsx
import { useMouseInElement } from 'solidjs-use'

const Demo = () => {
  const [target, setTarget] = createSignal(null)
  const { x, y, isOutside } = useMouseInElement(target)

  return (
    <div ref={setTarget}>
      <h1>Hello world</h1>
    </div>
  )
}
```
